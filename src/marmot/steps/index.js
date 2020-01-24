import {K} from "../../utility"
import * as List from "./list"
import terminators from "./terminators"

const actions = [
  'click',
  'debug',
  'enter',
  'exec',
  'fillIn',
  'notSee',
  'see',
  'sleep',
  'visit']

// Return a function that takes name, args, and page ('visit', '/', page)
const step = name => (...args) => page => page[name](...args)

// append step to list
const capture = (collector, name) => (...args) => (
  K(collector)(
    List.capture(collector.list)(step(name))(...args)))

const steps = (collector) => actions
  // all step handlers. e.g. {visit: ({url}) => page => page.visit(url)} 
  .reduce((ac, name) => ({ ...ac, [name] : capture(collector, name) }),

  // support for predefined arrays of steps/args
  // e.g. steps([['visit', '/'], ['click', 'MyLabel']])
  { steps: list => K(collector)(
        list.forEach(step => 
        capture(collector, step[0])(...step.slice(1)))),
    list: [] })

// Build the chainable/promisable object
// expects 'page', and 'run'
export const stepsCollector = initial => Object.assign(
  initial,
  steps(initial),
  terminators(initial))

