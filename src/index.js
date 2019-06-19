import {renderer, cleanup as DOMCleanup } from "./marmot/dom"
export * from "./marmot/dom"
export * from "./marmot/scenario"
export * from "./marmot/steps"

// Marmot config
const callbacks = {
  begin: []
}

let appRoot

const root = comp => (
  comp ?
    (appRoot = comp) :
    appRoot()) // eslint-disable-line

let appRouter

const router = obj => (
  obj ?
    (appRouter = obj) :
    appRouter())

const cleanup = () => DOMCleanup()

const on = name => callback => callbacks[name].push(callback)

const run = (name, options) => callbacks[name].forEach(callback => callback(options))

export const tap = returnable => callback => {
  callback(returnable)
  return returnable
}

const Marmot = {
  cleanup,
  on,
  renderer,
  root,
  router,
  run
}

export default Marmot
