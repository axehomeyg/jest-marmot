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

Marmot.on('begin')(opts => opts.func())

describe("Click Happy", () => {

  const func = jest.fn()

  scenario("Options passed through to callback", {func})
    .exec(() => expect(func).toHaveBeenCalled())
    .see("Click Me!")
    .run()

})

