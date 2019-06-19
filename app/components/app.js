import React from 'react'
import PropTypes from 'prop-types'
import connectComponent from '../connectComponent'
import Session from './session'
import Welcome from './welcome'

const App = ({page}) => ((page == 'welcome') ?
  <Welcome /> :
  <Session />)

App.propTypes = {
  page: PropTypes.string
}

export default connectComponent(App)
