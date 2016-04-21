import React from 'react'
import Hole from './Hole'
import classNames from 'classnames'

class Game extends React.Component {
  componentDidMount () {
    this.props.game.start()
  }

  render () {
    let classes = classNames({
      'game-board': true,
      easy: this.props.game.difficultyLevel === 'easy',
      medium: this.props.game.difficultyLevel === 'medium',
      hard: this.props.game.difficultyLevel === 'hard'
    })

    return (
      <div className={classes}>
        {this.props.game.holes.map(hole => <Hole key={hole.id.toString()} hole={hole} />)}
      </div>
    )
  }
}

module.exports = Game
