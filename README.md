# jest-marmot
> Jest React/Redux Test Framework DSL
## Heavily inspired by the RoR testing frameworks

[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]

## Install 
```bash
npm i --save-dev jest-marmot
```

## Usage
For a full redux/react-router example, see the redux [test](https://github.com/axehomeyg/jest-marmot/blob/master/__test__/session.test.js).

```javascript
import Marmot, {scenario} from 'jest-marmot'
import {MyRootComponent} from 'myRootComponent'

Marmot.root(() => <MyRootComponent />)

describe("My Feature", () => {
  scenario("My specific scene")
    .see("Hey Fella")
    .fillIn("Email", "test@jest-marmot.com")
    .click({testId: "submit"})
    .see("Welcome, " + "test@jest-marmot.com")
    .run()
})
```
## Advanced Setup

### Redux/ReactRouter w/ global setup

You'll want to configure Marmot global settings in your jest setup file.

e.g. in setupTests.js - configured from your package.json

```javascript
import React from 'react'
import Marmot from "jest-marmot"
import App from "./App.js"
import React from 'react'

// If you use react-router + history
import { MemoryRouter as Router } from 'react-router-dom'
import history from "singletonHistoryFile"

// If you use Redux/Thunk
import { applyMiddleware, createStore }  from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// You're actual root reducer
import reducer from '../reducers/rootReducer'
import Mocks from 'yourDbApiMock'

// Setup/teardown your db/api mock
Marmot.on('begin')(opts => opts.data && Mocks.mockBackend(opts.data))
Marmot.on('cleanup')(() => Mocks.reset())

// Set root to be first non-Provider-wrapped component at top-level
Marmot.root(() => <App />) 

// Let Marmot know what to use when 'visiting' a url
Marmot.router(() => history)

// Provider wrappers to be layered onto our rendered root
Marmot.renderer((component, options) => <Router>{component}</Router>)
Marmot.renderer((component, options) => <Provider>{child}</Router>)
```

Then in your tests, you can simply...
```javascript
import {scenario} from 'jest-marmot'

scenario("My test which assumes App is our entry point")
  .see("Homepage content")
  .click("Have A Go!")
  .see("Had a Went!")
  .run()
```

### Reusable steps/flows
An argument could be made that reusable flows are a sign of redundant testing with a need for a more balanced test pyramid. Alas, you may not have a choice in a large existing test suite! Marmot's step array support is just what the doctor ordered!

In your tests, you could do something like this.
```javascript
import {scenario} from 'jest-marmot'
import common from './steps/common'

scenario("A tour by an anonymous visitor")
  .see("Homepage content")
  .steps(common.tour)
  .see("Thanks for taking the tour")
  .run()

scenario("A tour by an identified user")
  .see("Homepage content")
  .fillIn("Name", "Billy")
  .steps(common.tour)
  .see("Thanks for taking the tour, Billy")
  .run()
```
Then, in ./steps/common.js
```javascript
export default common = ({
  tour: [
    ["click", "Start Tour"],
    ["see", "Step 1"],
    ["click", "Proceed"],
    ["see", "Step 2"],
    ["click", "Finish"],
  ]
})
```

## Troubleshooting

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/jest-marmot.svg
[npm-url]: https://npmjs.org/package/jest-marmot
[travis-image]: https://img.shields.io/travis/axehomeyg/jest-marmot/master.svg
[travis-url]: https://travis-ci.org/axehomeyg/jest-marmot

