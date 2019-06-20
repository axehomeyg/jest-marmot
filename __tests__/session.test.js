import React from 'react'
import Marmot, {scenario} from '../src/index'
import App from '../app/components/app'

// Redux/Router Mocks
import { applyMiddleware, createStore }  from 'redux'
import { Provider } from 'react-redux' // eslint-disable-line
import thunk from 'redux-thunk'
import reducer from '../app/reducers'
import { MemoryRouter as Router } from 'react-router-dom' // eslint-disable-line
import history from '../app/history'

/*
 * Mock Redux
 */
const createMockStore = (initialState = {}) => createStore(reducer, initialState, applyMiddleware(thunk))

const withProvider = store => child => {
  return (<Provider store={store}>{child}</Provider>)
}

/*
 * Mock Router
 */
const withRouter = (child, initialRoute) => {
  history.replace(initialRoute)
  return <Router initialEntries={[initialRoute || "/"]}>{child}</Router>
}

/*
 * Common Steps
 */

const common = ({
  signin: user => ([
    ['fillIn', 'Name', user.name],
    ['click', {testId:"submit"}],
    ['see', "Welcome, " + user.name],
    ['see', {testId: "subtitle"}]
  ])})

/*
 * Configure Marmot
 */
// other examples:
// Marmot.on('begin')(opts => opts.data && Mocks.mockBackend(opts.data))
// Marmot.on('cleanup')(() => Mocks.reset())
Marmot.root(() => <App />)
Marmot.router(() => history)
Marmot.renderer((child, opts) => withRouter(child, opts.route))
Marmot.renderer(child => withProvider(createMockStore({}))(child))

// Fixture
const names = [
  "Billy Bob",
  "Bilbo Baggins"
]

// Run the scenario with cleanup
describe("Account", () => {

  afterEach(Marmot.cleanup)

  scenario("Sign In - w/ navigation", {route: "/session"})
    .fillIn("Name", names[0])
    .click({testId:"submit"})
    .see("Welcome, " + names[0])
    .run()

  // A second similar test to smoke out test-isolation issues (jsdom not clearing out), also, navigation after init
  scenario("Sign In - w/ testId")
    .visit("/session")
    .fillIn("Name", "Bilbo Baggins")
    .click({testId:"submit"})
    .see("Welcome, " + names[1])
    .see({testId: "subtitle"})
    .run()

  // An example of a scenario that uses predefined steps
  scenario("Sign In - w/ factory steps")
    .steps(common.signin({name: "Dumbo Bumbo"}))
    .run()
})
