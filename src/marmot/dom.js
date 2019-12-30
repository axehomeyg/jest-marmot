import { act, render as RTLRender, waitForElement, fireEvent, cleanup as RTLCleanup } from '@testing-library/react'
import Marmot from "../index"
import userEvent from "@testing-library/user-event"

// What kind of dom query are we performing?
export const queryPlan = finder => {
  if(typeof finder == "string") {
    return "inlineText"
  }
  else if(finder.placeholder) {
    return "placeholder"
  }
  else if(finder.testId) {
    return "testId"
  }
  else if(finder.text) {
    return "text"
  }
  else if(finder.labelText) {
    return "label"
  }
  else {
    return undefined
  }
}

// Do we need a specialized find? (get, getAll, queryAll)
export const queryType = options => ((options && options.queryType) || "get")

// Map Search parameters into react-testing-library function calls
export const queryParameters = finder => ({
  "inlineText":   () => ["ByText", finder],
  "placeholder":  () => ["ByPlaceHolderText", finder.placeholder],
  "testId":       () => ["ByTestId", finder.testId],
  "text":         () => ["ByText", finder.text, finder.selector ? {selector: finder.selector} : {}],
  "label":        () => ["ByLabelText", finder.labelText ]})[queryPlan(finder)]()

// Execute the query using jsdom
const finderFunction = domFunctions => (queryParams, prefix) => domFunctions[prefix + queryParams[0]](...queryParams.slice(1))

// Wrapper with async wait support for finders
export const find = (finder, domFunctions, options) => (
  waitForElement(() => finderFunction(domFunctions)(queryParameters(finder,  options || {}), queryType(options)))
    .catch(err => {
      console.log("WaitForElement threw error", err, "For Finder", finder, "With Body", domFunctions.container, domFunctions.container.innerHTML) // eslint-disable-line
      throw err
    }))

// Click support
export const click = element => {
  act(() => userEvent.click(element))
}

// Enter support
export const enter = element => {
  act(() => fireEvent.keyDown(element, {  key: 'Enter', keyCode: 13, which: 13}))
}

// Type support
export const type = content => element => {
  act(() => userEvent.type(element, content))
}

// Visit
// todo: make this plugin into client router
export const visit = url => (Marmot.router().replace || window.location.assign)(url)

// Clean dom
export const cleanup = RTLCleanup

// Render Wrapper support (for client integrations such as react-router or redux)
const renderWrappers = []

const withWrapper = (child, options, wrapper) => wrapper(child, options)

const withWrappers = (child, options, wrappers) => (
  renderWrappers.reduce(
    (wrappedChild, wrapper) => (
      withWrapper(wrappedChild, options, wrapper)), child))

export const renderer = wrapper => renderWrappers.push(wrapper)

// Apply wrappers
export const render = (comp, options) => RTLRender(withWrappers(comp, options, renderWrappers))
