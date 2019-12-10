import React, { useState } from 'react'
import Marmot, {scenario} from '../src/index'

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

// Run the scenario with cleanup
describe("Click Happy", () => {

  const shown = "View Count: 1"

  scenario("Does it work?")
    .notSee(shown)
    .click({testId: "clickable"})
    .see(shown)
    .run()
})
