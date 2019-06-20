import React from 'react'
import Marmot, {scenario} from '../src/index'

const Page = () => {
  const resultsRef = React.createRef()
  const clickHandler = event => {
    event.preventDefault()
    resultsRef.current.innerHTML = "Thanks for clicking!"
  }

  return <div>
    <a href="/" data-testid="clickable" onClick={clickHandler}>Click Me!</a>
    <div ref={resultsRef}></div>
  </div>
}

Marmot.root(() => <Page />)

// Run the scenario with cleanup
describe("Click Happy", () => {

  const gratitude = "Thanks for clicking!"

  scenario("Does it work?")
    .notSee(gratitude)
    .click({testId: "clickable"})
    .see(gratitude)
    .run()

})
