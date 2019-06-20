import { stepsCollector } from "./steps"
import page from "./page"
import {render} from "./dom"
import Marmot from "../index"

// Run a chained operation scenario
export const scenario = (name, options = {}) => stepsCollector({

  // Access to the rendered page object
  page: () => page(render(Marmot.root(), options)),

  // Name to give the 'it' jest block
  name,

  // Options available to all running steps
  options})
