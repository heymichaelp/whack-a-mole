import EventDispatcher from '../utilities/EventDispatcher/EventDispatcher'

let whackSound = null
if (window.Audio) {
  whackSound = new window.Audio('public/whack.mp3')
}

export default class Mole extends EventDispatcher {
  constructor () {
    super()

    this.state = 'down'
  }

  hide () {
    this.off('whack')
    this.state = 'down'
    this.trigger('down')
  }

  whack () {
    if (whackSound) {
      whackSound.play()
    }

    this.trigger('whack')
    this.hide()
  }

  appear () {
    this.state = 'up'
    this.trigger('up')
  }

  isUp() {
    return this.state === 'up'
  }
}
