import * as StepsIndex from "../../../src/marmot/steps"

const initial = []

const collector = StepsIndex.stepsCollector(initial)

it("each step returns collector for continuous collection", () => {

  expect(
    collector.see("stuff")
  ).toEqual(collector)

})
