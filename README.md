# whack-a-mole

## Play!

Open the `dist/index.html` file in your browser to start playing. Make sure your sound is on!

Additionally, the game is available at [http://interview.whack-a-mole.s3-website-us-east-1.amazonaws.com/](http://interview.whack-a-mole.s3-website-us-east-1.amazonaws.com/)

## Tests

Tests are written using Mocha and expect, as well as React TestUtils for testing components. Run them with the following command:

```
$ npm i
$ npm i mochify -g
$ npm test
```

## Thought Process

When I initially sat down to think through the application structure, I first thought through the domain models.  They are as follows:

`Game`: represents one game, with a number of holes and a number of rounds
`Round`: belongs to a single game, has a time limit, number of moles shown, and a score
`Hole`: belongs to a game, one for each visual hole that a mole can appear from, has one mole.
`Mole`: belongs to a hole, is whacked.

The modeling for this application is pretty simple, and the only thing I would note about the architecture that is interesting is the distinction between a `Hole` and a `Mole`, for which there is currently a 1-to-1 relationship. Initially, in thinking about the game play, I was thinking that a mole may potentially shuffle around from hole to hole, appearing in different locations. This decoupled the `Hole` and `Mole`, making it so that a `Mole` may move around, or there would be a smaller number of `Mole`s than `Holes`s. This is why you see the `assignMolesToHoles` method in `models/game.js`. This is an abstraction that I suppose is in anticipation of features that aren't currently implemented, but I felt that the decoupling was sound enough architecture.

For score, a `Game` has a score that starts at `0`, but then a round has its own internal score. When a `Mole` is whacked during a `Round`, it calls a function that has a closure for `game.score`, which increments it by 1. Additionally, the internal round score is incremented and the `remainingMoles` count is decremented. This internal state could be used by future features, even though currently the only score that is used is the `game.score`, which is the value that is represented in the final "Game Over" screen.

Additionally, the number of moles is tracked during the `Round` initialization phase, where a constrained but random number of holes are assigned as active for the `Round`. This number is stored to track the "out of" metric. So the "Game Over" screen is showing the score divided by the number of holes assigned to all rounds in the game.

## EventDispatcher

I used an `EventDispatcher` class that I had made a little while back, which is comprised simply of `on`, `off`, and `trigger` methods. As you'll note in the accompanying spec file, `on` stores a callback for a given event, `off` unbinds those callbacks, and `trigger` simply executes all callbacks associated with the event triggered. Easy peasy.

## Component Architecture

The application uses React for building the interface. As you'll note from the components, the application is very simple. The `App` and `Dashboard` components are for starting the game and choosing the difficulty level, and for handling "routing". `Game` renders the grid of `Hole` components, which are responsible for the displaying and hiding of the mole and for listening to the click event.

## Difficulty Level

Once I wrote the initial approach, I realized that it would be very simple to introduce difficulty levels. A difficulty level is defined as thus:

* Number of holes
* Number of moles per round
* Seconds until round is over

For number of moles per round and seconds until round is over, I applied some logic. For number of moles, I have a min and max range from which each round chooses a random number. Then, for the seconds until the round is over, a start and end duration is specified and we calculate the steps down from the max to the min based on the number of rounds. So, for example, if we have the range specified as `10000...5000`, and we have `5` rounds, we step down as `[10000, 9000, 8000, 7000, 6000]` (this range is not inclusive). This means the game play speeds up from round to round.

## Graphics

I used a Google Font for the arcade-style typeface and I made my own graphics for the site using [make8bitart.com](http://make8bitart.com). The music was found on the internet from various locations.
