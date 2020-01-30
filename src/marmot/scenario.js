import { stepsCollector } from "./steps"
import page, { render } from "./page"

export {
  render,
  renderer,
  cleanup } from "./page"

// Run a chained operation scenario
export const scenario = (name, options = {}) => stepsCollector({

  // Access to the rendered page sobject
  page: () => page(render(global.marmotGlobals.root(), options)),

  // Name to give the 'it' jest block
  name,

  // Options available to all running steps
  options})

