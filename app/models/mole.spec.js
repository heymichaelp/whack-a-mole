import expect from 'expect'
import Mole from './mole'

describe('Mole', function () {
  describe('#constructor', function () {
    it('starts down', function () {
      let mole = new Mole()

      expect(mole.state).toEqual('down')
    })
  })

  describe('#appear', function () {
    it('changes state appropriately', function () {
      let mole = new Mole()

      mole.appear()

      expect(mole.state).toEqual('up')
    })

    it('triggers callbacks', function () {
      let mole = new Mole()
      let appearSpy = expect.createSpy()

      mole.on('up', appearSpy)
      mole.appear()

      expect(appearSpy).toHaveBeenCalled()
    })
  })

  describe('#whack', function () {
    it('changes state appropriately', function () {
      let mole = new Mole()

      mole.appear()

      expect(mole.state).toEqual('up')

      mole.whack()

      expect(mole.state).toEqual('down')
    })

    it('triggers callbacks', function () {
      let mole = new Mole()
      let whackSpy = expect.createSpy()
      let hideSpy = expect.createSpy()

      mole.on('whack', whackSpy)
      mole.on('down', hideSpy)
      mole.whack()

      expect(whackSpy).toHaveBeenCalled()
      expect(hideSpy).toHaveBeenCalled()
    })
  })

  describe('#hide', function () {
    it('changes state appropriately', function () {
      let mole = new Mole()

      mole.appear()

      expect(mole.state).toEqual('up')

      mole.hide()

      expect(mole.state).toEqual('down')
    })

    it('triggers callbacks', function () {
      let mole = new Mole()
      let hideSpy = expect.createSpy()

      mole.on('down', hideSpy)
      mole.hide()

      expect(hideSpy).toHaveBeenCalled()
    })
  })
})
