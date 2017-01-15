const debug = require('debug')('dply:test:unit:express_meta_data')
const ExpressMetaData = require('../lib/express_meta_data')


describe('Unit::ExpressMetaData', function () {


  describe('ExpressMetaData instance', function(){
    it('should have a middleware function', function(){
      expect( ExpressMetaData.middleware ).to.be.a('function')
    })
    it('should have generate a middleware function', function(){
      expect( ExpressMetaData.middleware() ).to.be.a('function')
    })
  })


  describe('ExpressMetaData instance', function(){

    let emd = null

    beforeEach(function(){
      emd = new ExpressMetaData()
    })

    it('should create an instance', function(){
      expect( emd ).to.be.a.instanceOf( ExpressMetaData )
    })

    it('should have a uid', function(){
      expect( emd.class_uid ).to.match( /^[a-f0-9-]{36}$/ )
    })

    it('should have a prototype of the last mixin', function(){
      let parent = Object.getPrototypeOf(emd.constructor).name;
      expect( parent ).to.equal( "MixinInstance" )
    })

    
    it('should start and return a time', function(){
      expect( emd.startRequest({},{}) ).to.be.a.number
    })

    it('should end and return a time', function(){
      rmd = emd.startRequest({},{})
      expect( emd.endRequest(rmd) ).to.be.a.number
    })

    it('should return the total after end', function(){
      a = emd.startRequest({},{})
      b = emd.endRequest(a)
      expect( b ).to.be.a.number
    })

  })


})
