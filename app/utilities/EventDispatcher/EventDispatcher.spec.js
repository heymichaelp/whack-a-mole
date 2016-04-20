import expect from 'expect';
import EventDispatcher from './EventDispatcher'

describe.only('EventDispatcher', function() {
  describe('.on', function() {
    it('stores the callback and context so that its called when triggered', function() {
      let eventName = 'myEvent'
      let callback = expect.createSpy()
      let context = {}

      EventDispatcher.on(eventName, callback, context)

      expect(EventDispatcher._eventMap[eventName]).to.have.length(1)
      expect(EventDispatcher._eventMap[eventName][0].callback).to.eql(callback)
      expect(EventDispatcher._eventMap[eventName][0].context).to.eql(context)
    })
  })

  describe('.trigger', function() {
    describe('executes all applicable callbacks when it\'s called', function() {
      it('does not perform anything if the event name has no defined callbacks', function() {
        var eventName = 'myEvent'
        var callback = expect.createSpy()

        EventDispatcher.on(eventName, callback)
        EventDispatcher.trigger('foobar')

        expect(callback.calls.length).to.eql(0)
      })

      it('handles a single callback for a given event', function() {
        var eventName = 'myEvent'
        var callback = expect.createSpy()

        EventDispatcher.on(eventName, callback)
        EventDispatcher.trigger(eventName)

        expect(callback.calls.length).to.eql(1)
      });

      it('handles multiple callbacks for a given event', function() {
        var eventName = 'myEvent'
        var callback1 = expect.createSpy()
        var callback2 = expect.createSpy()

        EventDispatcher.on(eventName, callback1)
        EventDispatcher.on(eventName, callback2)
        EventDispatcher.trigger(eventName)

        expect(callback1.calls.length).to.eql(1)
        expect(callback2.calls.length).to.eql(1)
      })

      it('executes with the specified arguments', function() {
        var eventName = 'myEvent'
        var callback = expect.createSpy()

        EventDispatcher.on(eventName, callback)
        EventDispatcher.trigger(eventName, 1, 2, 3)

        expect(callback).toHaveBeenCalledWith([1, 2, 3])
      })

      it('executes the callbacks within the supplied context if specified', function() {
        var eventName = 'myEvent'
        var context = {
          _counter: 0,
          callback: expect.createSpy().andCall(function() {
            this._counter++
          })
        }

        EventDispatcher.on(eventName, context.callback, context)
        EventDispatcher.trigger(eventName)

        expect(context._counter).to.eql(1)
      })
    })
  })
})