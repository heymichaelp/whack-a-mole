import React from 'react'
import ReactDOM from 'react-dom'
import GameModel from '../models/game'
import Dashboard from './Dashboard'
import Game from './Game'

let welcomeAudio = new window.Audio('public/backgroundmusic.mp3')
welcomeAudio.loop = true

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      status: 'none',
      currentGame: null
    }
  }

  createNewGame (level) {
    this.setState({
      status: 'current',
      currentGame: new GameModel(level)
    })
  }

  renderGameOver () {
    let percentAccuracy = parseInt((this.state.currentGame.score / this.state.currentGame.numberOfMolesShown) * 100, 0)

    return (
      <div className='dashboard'>
        <p>GAME OVER!</p>
        <p>Score is {this.state.currentGame.score}/{this.state.currentGame.numberOfMolesShown} ({percentAccuracy}% Accuracy)</p>

        <p onClick={this.createNewGame.bind(this, this.state.currentGame.difficultyLevel)}>PLAY AGAIN</p>
      </div>
    )
  }

  renderCurrentGame () {
    this.state.currentGame.on('end', () => {
      this.setState({ status: 'over' })
    })

    return (
      <Game game={this.state.currentGame} createNewGame={this.createNewGame.bind(this)} />
    )
  }

  renderDashboard () {
    welcomeAudio.play()

    return (
      <Dashboard createNewGame={this.createNewGame.bind(this)} />
    )
  }

  render () {
    if (this.state.status === 'over') {
      return this.renderGameOver()
    } else if (this.state.status === 'current') {
      return this.renderCurrentGame()
    } else {
      return this.renderDashboard()
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
