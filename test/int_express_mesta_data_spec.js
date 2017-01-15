const expect = require('chai').expect
const request = require('supertest')
const app = require('express')()
const Emd = require('../')

describe('Integration::ExpressMetaData', function(){

  describe('requires class from package.json', function(){

    it('should load the middleware', function(){
      app.use(Emd.middleware())
      app.get('/', (req, res)=> res.send(`hello ${req.request_uid}`))
    })

    it('should do something with module', function(){
      return request(app).get('/').then(res => {
        expect(res.text).to.match( /hello [0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
        expect(res.status).to.equal(200)
      })
    })

  })

})
