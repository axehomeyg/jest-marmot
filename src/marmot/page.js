import {
  click,
  enter,
  find,
  type,
  visit } from "./dom"

import { promise } from "../utility"

export { render, renderer, cleanup } from "./dom"

// this 'page' object holds onto the testing-library dom/container/functions for interacting with jsdom
const normalizeFillInFinder = finder => (
  (typeof finder == "string") ?
    {labelText: finder} :
    finder)

const withFinder = domFunctions => handler => finder => (
  find(finder, domFunctions)
    .then(handler))

export const page = domFunctions => ({
    // Click on an element
    click: withFinder(domFunctions)(click),

    // Debug the DOM
    debug: domFunctions.debug,

    // Type EnterKey into a field
    enter: withFinder(domFunctions)(enter),

    // execute arbitrary code in the step pipeline (for custom assertions)
    exec: callback => callback(domFunctions),

    // Type value into form field
    fillIn: (finder, content) => (
      withFinder(domFunctions)
        (type(content))
        (normalizeFillInFinder(finder))),

    // Using the wait helpers for notSee takes forever, let's use pure JS on the dom body
    notSee: (content) => expect(
      domFunctions
        .container
        .innerHTML)
      .toEqual(
        expect
          .not
          .stringContaining(content)),

    // Look for content on page
    see: (content) => find(content, domFunctions),

    // Add in a 'wait' to the tests (last resort during debugging)
    sleep: ms => promise(resolve => setTimeout(resolve, ms)),
   
    // Use whatever router mechanism you have defined to issue a page visit
    visit
  })

export default page 
