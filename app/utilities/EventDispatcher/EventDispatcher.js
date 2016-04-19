export default class EventDispatcher {
  constructor () {
    this._eventMap = {}
  }

  on (eventName, callback, context) {
    // checking to see if event is registered,
    // if it isn't registered yet, create the event array
    // for callback storage
    if (!this._eventMap[eventName]) {
      this._eventMap[eventName] = []
    }

    // store the callback on the event map
    this._eventMap[eventName].push({
      callback: callback,
      context: context
    })
  }

  off (eventName) {
    delete this._eventMap[eventName]
  }

  trigger (eventName) {
    let args = Array.prototype.slice.call(arguments, 1)
    let callbackObjects = this._eventMap[eventName]

    if (!callbackObjects) { return }

    callbackObjects.forEach((callbackObject) => {
      callbackObject.callback.apply(callbackObject.context, args)
    })
  }
}
