import * as RTL from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import "regenerator-runtime/runtime"

import userEvent from "@testing-library/user-event"

import { dig } from "../utility"

import { withWrappers } from "./wrappers"

export { cleanup } from "@testing-library/react"

export { renderer } from "./wrappers" 

// Do we need a specialized find? (get, getAll, queryAll)
export const queryType = options => (dig(['queryType'], options) || "get")

// Map Search parameters into react-testing-library function calls

export const queryParameters = finder => (
  ((typeof finder == "string") &&
    ["ByText", finder]) ||
  (finder.placeholder &&
    ["ByPlaceHolderText", finder.placeholder]) ||
  (finder.testId &&
    ["ByTestId", finder.testId]) ||
  (finder.text &&
    ["ByText", finder.text, finder.selector ? { selector: finder.selector } : {}]) ||
  (finder.labelText && 
    ["ByLabelText", finder.labelText]))

// Execute the query using jsdom
export const finderFunction = domFunctions => ([query, ...args], prefix) => domFunctions[prefix + query](...args)

export const findError = err => {
  process.env.DEBUG &&
    console.warn("WaitForElement threw error", err)
  throw err
}

// Wrapper with async wait support for finders
export const find = (finder, domFunctions, options) => (
  RTL.waitForElement(() => (
    finderFunction
      (domFunctions)
      ( queryParameters(finder,  options || {}),
        queryType(options))))
    .catch(findError))

// helper function
export const asyncCall = call => async el => (await call(el))

// Click support
export const click = element => { RTL.act(() => userEvent.click(element)) ; return }

// Enter support
export const enter = asyncCall(el => RTL.fireEvent.keyDown(el, {  key: 'Enter', keyCode: 13, which: 13}))

// Type support
export const type = content => asyncCall(el => userEvent.type(el, content))

// Visit
// todo: make this plugin into client router
export const visit = url => (global.marmotGlobals.router().replace || global.window.location.assign)(url)

// Apply wrappers
export const render = (comp, options) => RTL.render(withWrappers(comp, options))
