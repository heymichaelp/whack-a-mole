import expect from 'expect'
import Hole from './hole'
import Mole from './mole'

describe('Hole', function() {
  describe('#assignMole', function() {
    it('assigns the mole to the hole', function() {
      let hole = new Hole()

      expect(hole.mole).toNotExist()

      let mole = new Mole()
      hole.assignMole(mole)

      expect(hole.mole).toEqual(mole)
    })
  })

  describe('#hasMole', function() {
    context('it has a mole', function() {
      it('returns true', function() {
        let hole = new Hole()
        let mole = new Mole()

        hole.assignMole(mole)

        expect(hole.hasMole()).toEqual(true)
      })
    })
    context('it doesn\'t have a mole', function() {
      it('returns true', function() {
        let hole = new Hole()

        expect(hole.hasMole()).toEqual(false)
      })
    })
  })
})