import React from 'react'
import classNames from 'classnames'

class Hole extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      moleIsUp: false
    }
  }

  hitMole () {
    if (this.props.hole.mole.isUp()) {
      this.props.hole.mole.whack()
    }
  }

  componentWillMount () {
    if (this.props.hole.hasMole()) {
      this.props.hole.mole.on('up', () => this.setState({ moleIsUp: true }))
      this.props.hole.mole.on('down', () => this.setState({ moleIsUp: false }))
    }
  }

  render () {
    let classes = classNames({
      'hole': true,
      'mole-is-up': this.state.moleIsUp
    })

    return (
      <div className={classes} onClick={this.hitMole.bind(this)}>
      </div>
    )
  }
}

module.exports = Hole
