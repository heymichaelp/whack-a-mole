import expect from 'expect'
import React from 'react'
import Game from './Game'
import GameModel from '../models/game'
import TestUtils from 'react-addons-test-utils'

function setup () {
  let game = new GameModel('easy')

  let props = {
    game
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Game {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('Game', () => {
  it('should render default correctly', () => {
    const { renderer } = setup()
    let output = null

    output = renderer.getRenderOutput()

    expect(output.type).toBe('div')
    expect(output.props.className).toBe('game-board easy')
  })

  it('should have the right number of holes', () => {
    const { renderer } = setup()
    let output = null

    output = renderer.getRenderOutput()

    expect(output.props.children.length).toBe(12)
  })
})
