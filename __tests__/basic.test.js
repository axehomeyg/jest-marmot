import React, { useState } from 'react'

import * as Marmot from "../src/index"
window.MessageChannel = require('worker_threads').MessageChannel

const Page = () => {
  const [views, setViews] = useState(0)
  const [text, setText] = useState("")

  const inputRef = React.createRef()

  const clickHandler = event => {
    event.preventDefault()
    setViews(views + 1)
    setText(inputRef.current.value)
  }

  return <div>
    <a href="/" data-testid="clickable" onClick={clickHandler}>Click Me!</a>
    <div>{views > 0 ? `View Count: ${views}` : ""}</div>
    <h1>{text}</h1>
    <label htmlFor="tayuxt">Tayuxt</label>
    <input type="text" id="tayuxt" ref={inputRef} />
  </div>
}

Marmot.root(() => <Page />)

// Run the scenario with cleanup
describe("Click Happy", () => {

  const shown = "View Count: 1"

  const tayuxt = "doh!"
  Marmot.scenario("Does it work?")
    .notSee(shown)
    .click({testId: "clickable"})
    .see(shown)
    .run()

  Marmot.scenario("Text handling")
    .fillIn("Tayuxt", "doh!")
    .click({testId: "clickable"})
    .see("doh!")
    .run()

  Marmot.scenario("Text handling")
    .steps([
      ["fillIn", "Tayuxt", "dang!"],
      ["click", {testId: "clickable"}],
      ["see", "dang!"]])
    .run()

})
