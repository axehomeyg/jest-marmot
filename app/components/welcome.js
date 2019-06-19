import React from 'react'
import PropTypes from 'prop-types'
import connectComponent from '../connectComponent'

const Welcome = props => <div>
  <h1>Welcome, {props.name}</h1>
  <span data-testid="subtitle">To the greatest test on Earth</span>
</div>

Welcome.propTypes = {
  name: PropTypes.string
}

export default connectComponent(Welcome)
