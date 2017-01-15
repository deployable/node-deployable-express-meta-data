const debug = require('debug')('dply:express_meta_data')

const MixinClassUid = require('deployable-mixin-class_uid')
const MixinInstances = require('deployable-mixin-instances')
const RequestMetaData = require('deployable-request-meta-data')
const mix = require('mixwith').mix

console.debug = console.log

class ExpressMetaDataMix {}
module.exports = class ExpressMetaData extends mix(ExpressMetaDataMix).with( MixinClassUid, MixinInstances ) {

  static middleware(){
    let emd = this.new()
    return this.genMiddleware()
  }

  constructor ( options = {} ) {
    super( options )
    this.running_requests = {}
    this.running_requests_limit = 500
    this.regular()
    this.logger = ( options.logger ) ? options.logger : console
    this.callback_end = options.callback_end
    this.callback_start = options.callback_start
  }

  // returns the instance of RequestMetaData that has been attached to
  // this EMD instance
  startRequest (req, res) {
    debug('startRequest', req.url)
    let rmd = new RequestMetaData(req, res, { logger: this.logger, emd: this })
    this.running_requests[rmd.request_id] = { rmd: rmd }
    rmd.start()
    rmd.logStart()
    return rmd
  }


  endRequest (rmd) {
    rmd.end()
    rmd.logEnd()
    delete this.running_requests[rmd.request_id]
    return rmd
  }

  endCallback () {
    if (this.callback_end) this.callback_end()
  }

  startCallback () {
    if (this.callback_start) this.callback_start()
  }


  // Background timer tasks. Not sure this is a good idea
  // Should use some type of generic job scheduler that tracks
  // running tasks.
  regular() {
    setTimeout( () => {
      debug('emd regular running')
      let val = Object.keys(this.running_requests).length
      if ( val > this.running_requests_limit ){
        this.logger.warn('emd running_requests value is high', val)
      }
      this.regular()
    }, 30000)
  }


  // Create a middleware function that tracks requests
  genMiddleware ( options = {} ) {
    let logger = this.logger || options.logger || console
    let self = this

    self.startCallback()

    // Return some middleware
    return function (req, res, next) {

      // Setup the meta data for this request
      let rmd = self.startRequest(req, res)

      // Attach a handler for the end of the request
      let previousEnd = res.end
      res.end = function () {
        previousEnd.apply(res, arguments)
        self.endRequest(rmd)
        self.endCallback()
      }
      next()
    }
  }

}
