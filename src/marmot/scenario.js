import { stepsCollector } from "./steps"
import state from "./state"
import {render} from "./dom"
import Marmot from "../index"

// Run a chained operation scenario
export const scenario = (name, options = {}) => stepsCollector({
  state: root => state(render(Marmot.root(), options)),
  name,
  options})
