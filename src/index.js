import { callOrCreate } from "./utility"
import * as Scenario from "./marmot/scenario"
import * as Callbacks from "./marmot/callbacks"

Callbacks.setGlobals()
/* *********************************************
 * Config (app to render, router for navigation)
 * ********************************************/
export const root = callOrCreate(global.marmotGlobals)('root')

export const router = callOrCreate(global.marmotGlobals)('router')

// Register a callback on an eventname (begin|cleanup)
export const on = Callbacks.on

// Run callbacks for a given eventname
export const run = Callbacks.run

// Call this in afterEach for all scenarios
export const cleanup = () => [Callbacks.run('cleanup'), Scenario.cleanup()]

export const renderer = Scenario.renderer

export const scenario = Scenario.scenario

const Marmot = {
  cleanup,
  on,
  renderer,
  root,
  router,
  run
}

export default Marmot
