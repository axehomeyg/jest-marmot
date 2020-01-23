import {renderer as DomRenderer, cleanup as DOMCleanup } from "./marmot/dom"
import {dig, callOrCreate} from "./utility"
import * as Scenario from "./marmot/scenario"

export const scenario = Scenario.scenario

const marmotGlobals = {
  callbacks: {
    begin: [],
    cleanup: []
  }
}

/* *********************************************
 * Config (app to render, router for navigation)
 * ********************************************/
export const root = callOrCreate(marmotGlobals)('root')

export const router = callOrCreate(marmotGlobals)('router')

/* **************
 * Callbacks
 * *************/
const callbacks = name => dig(['callbacks', name], marmotGlobals)

const execCallback = options => callback => callback(options)

// Register a callback on an eventname (begin|cleanup)
export const on = name => callback => callbacks(name).push(callback)

// Run callbacks for a given eventname
export const run = (name, options) => callbacks(name).forEach(execCallback(options))

// Call this in afterEach for all scenarios
export const cleanup = () => [run('cleanup'), DOMCleanup()]

export const renderer = DomRenderer

const Marmot = {
  cleanup,
  on,
  renderer,
  root,
  router,
  run
}

export default Marmot
