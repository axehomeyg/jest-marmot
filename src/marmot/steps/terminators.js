import Marmot from "../../index"
import {K} from "../../utility"
import * as List from "./list"

// step terminators (returns a jest-friendly promise) 
const terminators = collector => ({
  then: res => collector.toPromise().then(res),

  run:  () => it(collector.name, async done => K(K(collector)(collector.done = done))(Marmot.run('begin', collector.options))),

  // Run all of those steps
  toPromise: () => List.run(collector.list, collector.done)(collector.page())
})

export default terminators
