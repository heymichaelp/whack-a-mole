import EventDispatcher from '../utilities/EventDispatcher/EventDispatcher'

export default class Hole extends EventDispatcher {
  assignMole (mole) {
    this.mole = mole
  }

  hasMole () {
    return !!this.mole
  }
}
