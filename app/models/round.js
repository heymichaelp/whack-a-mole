import EventDispatcher from '../utilities/EventDispatcher/EventDispatcher'

function tellMolesToAppear (holes) {
  holes.forEach((hole) => hole.mole.appear())
}

function tellMolesToHide (holes) {
  holes.forEach((hole) => hole.mole.hide())
}

function bindCallbackToMoleWhacks (holes, cb) {
  holes.forEach((hole) => hole.mole.on('whack', cb))
}

let newRoundAudio = new Audio('public/newround.mp3')

export default class Round extends EventDispatcher {
  constructor (scoreIncrement, duration, holes) {
    super()

    this.scoreIncrement = scoreIncrement
    this.duration = duration
    this.holes = holes
    this.score = 0
    this.remainingMoles = this.holes.length
  }

  decrementNumberOfRemainingMoles () {
    this.remainingMoles--
    this.score++

    if (this.remainingMoles === 0) {
      this.end()
    }
  }

  end () {
    clearTimeout(this.timeout)
    tellMolesToHide(this.holes)

    // this is to let all React components update
    // before we start a new round
    setTimeout(() => { this.trigger('end') }, 0)
  }

  startCountDown () {
    newRoundAudio.play()
    this.timeout = setTimeout(this.end.bind(this), this.duration)
  }

  start () {
    bindCallbackToMoleWhacks(this.holes, () => {
      this.scoreIncrement()
      this.decrementNumberOfRemainingMoles()
    })
    tellMolesToAppear(this.holes)
    this.startCountDown()
  }
}
