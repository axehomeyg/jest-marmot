import React, { useState } from 'react'
// Working in library, not externally
// import Marmot, {scenario as scenarioa} from '../src/index'

import * as Marmot from "../src/index"
// Invalid Hook
// import Marmot, {scenario} from '../lib/jest-marmot.js'

// import * as JM from '../lib/jest-marmot.js'
//
// console.log("Root", Marmot.root, root)
// console.log("Scenario", scenarioa, scenario)
// console.log("JestMarmot", JestMarmot)

// const Marmot = JestMarmot.Marmot
// const scenario = JestMarmot.scenario
//
window.MessageChannel = require('worker_threads').MessageChannel

const Page = () => {
  const [views, setViews] = useState(0)

  const clickHandler = event => {
    event.preventDefault()
    setViews(views + 1)
  }

  return <div>
    <a href="/" data-testid="clickable" onClick={clickHandler}>Click Me!</a>
    <div>{views > 0 ? `View Count: ${views}` : ""}</div>
  </div>
}

Marmot.root(() => <Page />)
// root(() => <Page />)

// Run the scenario with cleanup
describe("Click Happy", () => {

  const shown = "View Count: 1"

  Marmot.scenario("Does it work?")
    .notSee(shown)
    .click({testId: "clickable"})
    .see(shown)
    .run()

  // // Uncomment to test step failure handling
  // Marmot.scenario("Fails predictably")
  //   .notSee(shown)
  //   .click({testId: "aclickable"})
  //   .see(shown)
  //   .run()

})
