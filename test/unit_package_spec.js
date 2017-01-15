const Emd = require('../')

describe('Unit::express-meta-data', function(){

  describe('requires class from package.json', function(){

    it('should do something with module', function(){
      expect( Emd ).to.be.ok
    })

    it('should do something with module', function(){
      expect( Emd.middleware ).to.be.a('function')
    })

  })

})
