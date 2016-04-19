import React from 'react'
import Hole from './Hole'
import classNames from 'classnames'

class Game extends React.Component {
  componentDidMount () {
    this.props.game.start()
  }

  render () {
    let classes = classNames({
      easy: this.props.game.difficultyLevel === 'easy',
      medium: this.props.game.difficultyLevel === 'medium',
      hard: this.props.game.difficultyLevel === 'hard',
      'game-board': true
    })

    return (
      <div className={classes}>
        {this.props.game.holes.map((hole) => <Hole hole={hole} />)}
      </div>
    )
  }
}

module.exports = Game
