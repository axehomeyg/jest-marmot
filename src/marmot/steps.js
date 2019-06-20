import Marmot from "../index"
import {actions} from "./state"
import {tap} from "../utility"

// generates hash of functions like...
// e.g. visit = (...args) => state => state.visit(...args)
const featureSteps = actions.reduce(
  (steps, name) => ({
    ...steps,
    [name] : (...args) => state => state[name](...args)
  }), {})

// a hash that supports a chaining DSL
// e.g. stepCollector(initialState).visit("/").click("button").fillIn("k","v")

// individual step handler 
const captureStep = (collector, stepName) => (...args) => (
  tap(collector)(() => collector.stepList.push(featureSteps[stepName](...args))))

// all step handlers
const stepHandlers  = (collector) => Object 
  .keys(featureSteps)
  .reduce((proxy, stepName) => (
    { ...proxy,
      [stepName] : captureStep(collector, stepName)}),
    {
      steps: list => list.reduce((collector, step) => captureStep(collector, step[0])(...step.slice(1)), collector),
      stepList: []
    })

// step terminators (returns a jest-friendly promise) 
const stepTerminators = (collector) => ({

  // Acutally execute the test (don't render anything before this point)
  run: () => it(collector.name, () => {
    Marmot.run('begin', collector.options) 
    return collector
  }),
  
  // Called by jest's automatic promise return handling
  then: res => collector.toPromise().then(res),

  // Run all of those steps
  toPromise: () => {
    const state = collector.state()

    return collector.stepList.reduce((chain, func) => {
      return chain.then(result => func(state))
    }, Promise.resolve([]))
  }

})

// Build the chainable/promisable object
export const stepsCollector = initial => tap(initial)(collector => Object.assign(
  collector,
  stepHandlers(collector),
  stepTerminators(collector)))

