import {click, enter, find, type, visit} from "./dom"
import {tap} from "../utility"

const promise = callback => (new Promise(resolve => callback(resolve)))

// this 'state' is a wrapper for the rendered jsdom and all of its
// helper functions
//
const state = domFunctions => tap({})(testState => Object.assign(
  testState,
  {
    /* Form Helpers */
    // Hit 'enter' in the specified field
    enter: (finder) => find(finder, domFunctions).then(enter),

    // Type value into form field
    fillIn: (finder, content) =>  {

      if(typeof finder == 'string') {
        finder = {labelText: finder}
      }
      
      return find(finder, domFunctions).then(type(content))
    },

    // Click on an element
    click: (finder) => find(finder, domFunctions).then(click),

    // execute arbitrary code in the step pipeline (for custom assertions)
    exec: (callback) => callback(domFunctions),

    // Look for content on page
    see: (content) => find(content, domFunctions),

    // Using the wait helpers for notSee takes forever, let's use pure JS on the dom body
    notSee: (content) => expect(
      domFunctions.container.innerHTML
    ).toEqual(expect.not.stringContaining(content)),
   
    // Debug the DOM
    debug: () => domFunctions.debug(),

    // Add in a 'wait' to the tests (last resort during debugging)
    sleep: (ms) => promise(resolve => setTimeout(() => resolve(testState), ms)),
   
    // Use whatever router mechanism you have defined to issue a page visit
    visit: url => visit(url)
  }))

export const actions = [
  'click',
  'debug',
  'enter',
  'exec',
  'fillIn',
  'notSee',
  'see',
  'sleep',
  'visit'
]

export default state 
