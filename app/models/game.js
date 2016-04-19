import async from 'async'
import _ from 'lodash'
import Hole from './hole'
import Mole from './mole'
import Round from './round'
import EventDispatcher from '../utilities/EventDispatcher/EventDispatcher'

let difficultLevelConfigMap = {
  easy: {
    numberOfRounds: 10,
    numberOfHoles: 12,
    numberOfMoles: 12,
    roundDurations: _.range(4000, 3500, -(500 / 15)),
    numberOfMolesPerRoundMin: 2,
    numberOfMolesPerRoundMax: 3
  },
  medium: {
    numberOfRounds: 10,
    numberOfHoles: 16,
    numberOfMoles: 16,
    roundDurations: _.range(4000, 3000, -(1000 / 15)),
    numberOfMolesPerRoundMin: 3,
    numberOfMolesPerRoundMax: 5
  },
  hard: {
    numberOfRounds: 10,
    numberOfHoles: 25,
    numberOfMoles: 25,
    roundDurations: _.range(4000, 2000, -(2000 / 15)),
    numberOfMolesPerRoundMin: 4,
    numberOfMolesPerRoundMax: 7
  }
}

function assignMolesToHoles (holes) {
  let numberOfHoles = holes.length
  let moles = _.times(numberOfHoles, () => new Mole())
  let holeIndeces = _.range(0, numberOfHoles)
  let moleIndeces = _.range(0, numberOfHoles)

  _.times(numberOfHoles, () => {
    let hole = holes[holeIndeces.pop()]
    let mole = moles[moleIndeces.pop()]

    hole.assignMole(mole)
  })
}

function pickRandomHolesForRound (holes, numberOfMolesPerRound) {
  return _.sampleSize(holes, numberOfMolesPerRound)
}

export default class Game extends EventDispatcher {
  constructor (difficultyLevel = 'easy') {
    super()

    this.state = 'ongoing'
    this.difficultyLevel = difficultyLevel
    this.config = difficultLevelConfigMap[difficultyLevel]
    this.score = 0
    this.numberOfMolesShown = 0
    this.rounds = []
    this.holes = _.times(this.config.numberOfHoles, () => new Hole())

    assignMolesToHoles(this.holes)
  }

  end () {
    this.state = 'over'
    this.trigger('end')
  }

  initiateRound () {
    let scoreIncrement = (() => {
      return () => {
        this.score++
      }
    })()

    let numberOfMoles = _.random(this.config.numberOfMolesPerRoundMin, this.config.numberOfMolesPerRoundMax)
    let holes = pickRandomHolesForRound(this.holes, numberOfMoles)
    let duration = parseInt(this.config.roundDurations[this.rounds.length], 10)

    this.numberOfMolesShown += numberOfMoles

    return new Round(scoreIncrement, duration, holes)
  }

  start () {
    let startNewRound = (n, next) => {
      let round = this.initiateRound()
      this.rounds.push(round)
      round.on('end', () => next())
      round.start()
    }

    async.timesSeries(this.config.numberOfRounds, startNewRound.bind(this), (err, result) => {
      if (err) {
        throw new Error(err)
      }

      this.end()
    })

    this.trigger('start')
  }
}
