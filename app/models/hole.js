import UUID from 'uuid-js'
import EventDispatcher from '../utilities/EventDispatcher/EventDispatcher'

export default class Hole extends EventDispatcher {
  constructor () {
    super()

    this.id = UUID.create()
  }

  assignMole (mole) {
    this.mole = mole
  }

  hasMole () {
    return !!this.mole
  }
}
