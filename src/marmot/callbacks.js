import { dig } from "../utility"

/* **************
 * Callbacks
 * *************/
const callbacks = name => dig(['callbacks', name], global.marmotGlobals)

const execCallback = options => callback => callback(options)

// Register a callback on an eventname (begin|cleanup)
export const on = name => callback => callbacks(name).push(callback)

// Run callbacks for a given eventname
export const run = (name, options) => callbacks(name).forEach(execCallback(options))

// Call this in afterEach for all scenarios

export const setGlobals = globals => (
  global.marmotGlobals = globals || ({
    root: undefined,
    router: undefined,
    callbacks: {
      begin: [],
      cleanup: []
    }
  }))

