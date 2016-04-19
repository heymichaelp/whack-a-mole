// var expect = require('chai').expect

// describe('ED', function() {
//   describe('.on', function() {
//     it('stores the callback and context so that its called when triggered', function() {
//       var eventName = 'myEvent'
//       var callback = function() {}
//       var context = {}

//       ED.on(eventName, callback, context)

//       expect(ED._eventMap[eventName]).to.have.length(1)
//       expect(ED._eventMap[eventName][0].callback).to.eql(callback)
//       expect(ED._eventMap[eventName][0].context).to.eql(context)
//     })
//   })

//   describe('.trigger', function() {
//     describe('executes all applicable callbacks when it\'s called', function() {
//       it('does not perform anything if the event name has no defined callbacks', function() {
//         var callbackCounter = 0
//         var eventName = 'myEvent'
//         var callback = function() {
//           callbackCounter++
//         }

//         ED.on(eventName, callback)
//         ED.trigger('foobar')

//         expect(callbackCounter).to.eql(0)
//       })

//       it('handles a single callback for a given event', function() {
//         var callbackCounter = 0
//         var eventName = 'myEvent'
//         var callback = function() {
//           callbackCounter++
//         }

//         ED.on(eventName, callback)
//         ED.trigger(eventName)

//         expect(callbackCounter).to.eql(1)
//       });

//       it('handles multiple callbacks for a given event', function() {
//         var eventName = 'myEvent'
//         var callback1Counter = 0
//         var callback1 = function() {
//           callback1Counter++
//         }
//         var callback2Counter = 0
//         var callback2 = function() {
//           callback2Counter++
//         }

//         ED.on(eventName, callback1)
//         ED.on(eventName, callback2)
//         ED.trigger(eventName)

//         expect(callback1Counter).to.eql(1)
//         expect(callback2Counter).to.eql(1)
//       })

//       it('executes with the specified arguments', function() {
//         var eventName = 'myEvent'
//         var callbackArguments;
//         var callback = function() {
//           callbackArguments = Array.prototype.slice.call(arguments, 0)
//         }

//         ED.on(eventName, callback)
//         ED.trigger(eventName, 1, 2, 3)

//         expect(callbackArguments).to.eql([1, 2, 3])
//       })

//       it('executes the callbacks within the supplied context if specified', function() {
//         var eventName = 'myEvent'
//         var context = {
//           _counter: 0,
//           callback: function() {
//             this._counter++
//           }
//         }

//         ED.on(eventName, context.callback, context)
//         ED.trigger(eventName)

//         expect(context._counter).to.eql(1)
//       })
//     })
//   })
// })