import _ from 'lodash'
import expect from 'expect'
import Game from './game'

describe('Game', function() {
  describe('constructor', function() {
    it('score starts at 0', function() {
      let game = new Game('easy')
      expect(game.score).toEqual(0)
    })

    it('has correct number of holes', function() {
      let game = new Game('easy')
      expect(game.holes.length).toEqual(12)
    })

    it('has every mole assigned to a hole', function() {
      let game = new Game('easy')
      expect(_.every(game.holes, hole => hole.hasMole())).toEqual(true)
    })
  })

  describe('#start', function() {
    it('triggers start callbacks', function() {
      let game = new Game('easy')
      let startSpy = expect.createSpy()
      game.on('start', startSpy)

      game.start()

      expect(startSpy).toHaveBeenCalled()

      game.end()
    })

    it('creates the right number of rounds', function(done) {
      let game = new Game('easy')
      game.config.roundDurations = _.times(10, 1)

      game.on('end', () => {
        expect(game.rounds.length).toEqual(10)
        done()
      })

      game.start()
    })

    it('tracks the right score', function() {
      let game = new Game('easy')
      game.config.roundDurations = _.times(10, 1)

      var round = game.initiateRound(0);
      round.start()
      round.holes[0].mole.trigger('whack');

      var round = game.initiateRound(1);
      round.start()
      round.holes[0].mole.trigger('whack');

      expect(game.score).toEqual(2);
    })
  })
})