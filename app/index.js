import React            from 'react'
import { render }       from 'react-dom'
import { Provider }     from 'react-redux'
import { createStore }  from 'redux'

import rootReducer      from './reducers'

import App              from './components/app'

const store = createStore(rootReducer)

// Our tests will load App directly and simulate the provider, using the wrapper/plugin support
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
