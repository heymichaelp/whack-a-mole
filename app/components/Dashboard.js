import _ from 'lodash'
import React from 'react'

class Dashboard extends React.Component {
  render () {
    return (
      <div className='dashboard'>
        <h1>Whack-a-mole!</h1>
        <p>START NEW GAME</p>

        <p className='link easy' onClick={_.partial(this.props.createNewGame, 'easy')}>EASY</p>
        <p className='link medium' onClick={_.partial(this.props.createNewGame, 'medium')}>MEDIUM</p>
        <p className='link hard' onClick={_.partial(this.props.createNewGame, 'hard')}>HARD</p>
      </div>
    )
  }
}

module.exports = Dashboard
