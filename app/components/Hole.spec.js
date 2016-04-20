import expect from 'expect'
import React from 'react'
import Hole from './Hole'
import HoleModel from '../models/hole'
import MoleModel from '../models/mole'
import TestUtils from 'react-addons-test-utils'

function setup() {
  let hole = new HoleModel();
  hole.assignMole(new MoleModel())

  let props = {
    hole
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Hole {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('components', () => {
  describe('Hole', () => {
    it('should render default correctly', () => {
      const { output } = setup()

      expect(output.type).toBe('div')
      expect(output.props.className).toBe('hole')
    })

    it('should change classes when it appears', () => {
      const { props, renderer } = setup()

      props.hole.mole.appear()
      let output = renderer.getRenderOutput()

      expect(output.type).toBe('div')
      expect(output.props.className).toBe('hole mole-is-up')
    })

    it('should change classes on click', () => {
      const { props, renderer } = setup()
      let output = null

      props.hole.mole.appear()
      output = renderer.getRenderOutput()

      expect(output.type).toBe('div')
      expect(output.props.className).toBe('hole mole-is-up')

      output.props.onClick()
      output = renderer.getRenderOutput()

      expect(output.props.className).toBe('hole')
    })
  })
})