import {K} from "../../utility"
import * as List from "./list"
import * as Callbacks from "../callbacks"

// step terminators (returns a jest-friendly promise) 
const terminators = collector => ({
  then: res => collector.toPromise().then(res),

  // run:  () => it(collector.name, async done => K(K(collector)(collector.done = done))(Callbacks.run('begin', collector.options))),
  run:  () => it(collector.name, done => {
    return Promise.resolve(K(K(collector)(collector.done = done))(Callbacks.run('begin', collector.options)))
  }),

  // Run all of those steps
  toPromise: () => List.run(collector.list, collector.done)(collector.page())
})

export default terminators
