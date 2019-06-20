import {actions} from "../state"
import {K, tap} from "../../utility"
import * as List from "./list"
import terminators from "./terminators"

// Return a function that can run our step, once we're given a dom state to run against
const step = name => (...args) => state => state[name](...args)

// append step to list
const capture = (collector, name) => (...args) => K(collector)(List.capture(collector.list)(step(name))(...args))

// all step handlers
const steps = (collector) => actions
  .reduce((proxy, name) => (
    { ...proxy,
      [name] : capture(collector, name)
    }),
    {
      steps: list => K(collector)(list.reduce((collector, step) => capture(collector, step[0])(...step.slice(1)), collector)),
      list: []
    })

// Build the chainable/promisable object
// expects 'state', and 'run'
export const stepsCollector = initial => tap(initial)(collector => Object.assign(
  collector,
  steps(collector),
  terminators(collector)))

