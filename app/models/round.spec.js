import _ from 'lodash'
import expect from 'expect'
import Round from './round'
import Hole from './hole'
import Mole from './mole'

describe('Hole', function () {
  describe('#constructor', function () {
    before(function () {
      this.holes = _.times(3, () => new Hole())
      this.scoreIncrementSpy = expect.createSpy()
      this.duration = 1

      this.round = new Round(this.scoreIncrementSpy, this.duration, this.holes)
    })

    it('starts out with a zero score', function () {
      expect(this.round.score).toEqual(0)
    })

    it('starts out with all moles remaining', function () {
      expect(this.round.remainingMoles).toEqual(this.holes.length)
    })
  })

  describe('#start', function () {
    beforeEach(function () {
      this.holes = _.times(3, () => new Hole())
      this.holes.forEach((hole) => hole.assignMole(new Mole()))
      this.scoreIncrementSpy = expect.createSpy()
      this.duration = 10

      this.round = new Round(this.scoreIncrementSpy, this.duration, this.holes)
      this.round.start()
    })

    it('has all moles visible', function () {
      expect(_.every(this.holes, (hole) => hole.mole.isUp())).toEqual(true)
    })

    it('responds appropriately to mole whacks', function () {
      this.holes[0].mole.whack()

      expect(this.scoreIncrementSpy).toHaveBeenCalled()
      expect(this.round.score).toEqual(1)
      expect(this.round.remainingMoles).toEqual(this.holes.length - 1)
    })
  })

  describe('#end', function () {
    beforeEach(function () {
      this.holes = _.times(3, () => new Hole())
      this.holes.forEach((hole) => hole.assignMole(new Mole()))
      this.scoreIncrementSpy = expect.createSpy()
      this.duration = 100

      this.round = new Round(this.scoreIncrementSpy, this.duration, this.holes)

      this.round.start()
    })

    it('lasts the duration if not all moles are whacked', function (done) {
      let currentTime = new Date()

      this.round.on('end', () => {
        let expiredTime = new Date()

        expect(expiredTime - currentTime).toBeGreaterThanOrEqualTo(this.duration - 10)

        done()
      })
    })
  })
})
