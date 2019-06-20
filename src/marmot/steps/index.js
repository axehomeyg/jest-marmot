import Marmot from "../../index"
import {actions} from "../state"
import {tap, yieldSelf} from "../../utility"

// generates hash of functions like...
// e.g. visit = (...args) => state => state.visit(...args)
//
const featureStep = name => ({ [name] : (...args) => state => state[name](...args) })

const featureSteps = actions
  .reduce(
    (steps, name) => ({ ...steps, ...featureStep(name) }),
    {})

// a hash that supports a chaining DSL
// e.g. stepCollector(initialState).visit("/").click("button").fillIn("k","v")

// individual step handler 
const captureStep = (collector, stepName) => (...args) => (
  tap(collector)(() => collector.stepList.push(featureSteps[stepName](...args))))

// all step handlers
const stepHandlers  = (collector) => actions
  .reduce((proxy, stepName) => (
    { ...proxy,
      [stepName] : captureStep(collector, stepName)}),
    {
      steps: list => list.reduce((collector, step) => captureStep(collector, step[0])(...step.slice(1)), collector),
      stepList: []
    })

// step terminators (returns a jest-friendly promise) 
const stepTerminators = (collector) => ({
  then: res => collector.toPromise().then(res),

  run:  () => it(collector.name, () => tap(collector)(() => Marmot.run('begin'))),

  // Run all of those steps
  toPromise: () => yieldSelf(collector.state())(state => (
    collector.stepList.reduce((chain, func) => (
      chain.then(result => func(state))
    ), Promise.resolve([]))
  ))
})

// Build the chainable/promisable object
// expects 'state', and 'run'
export const stepsCollector = initial => tap(initial)(collector => Object.assign(
  collector,
  stepHandlers(collector),
  stepTerminators(collector)))

