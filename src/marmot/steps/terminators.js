import Marmot from "../../index"
import {K} from "../../utility"
import * as List from "./list"

// step terminators (returns a jest-friendly promise) 
const terminators = collector => ({
  then: res => collector.toPromise().then(res),

  run:  () => it(collector.name, () => K(collector)(Marmot.run('begin'))),

  // Run all of those steps
  toPromise: () => List.run(collector.list)(collector.page())
})

export default terminators
