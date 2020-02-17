import * as StepsList from "../../../src/marmot/steps/list"

it("provides an accessor to append a function called with args to a list, in stages", () => {

  const steplist = []

  const funcsAndArgs = [
    [x => x * 2, 5],
    [x => x * 3, 11],
    [x => x * 4, 8]
  ]

  funcsAndArgs
    .forEach(([func, ...args]) => (
      StepsList
        .capture(steplist)
                (func)
                (...args)))

  expect(steplist).toEqual([10, 33, 32])
})

describe("#run", () => {
  const finito = jest.fn() 

  const failo  = jest.fn()

  const state = {}

  finito.fail = failo

  it("runs a list of functions as a promise chain", async done => {

    StepsList
      .run([
          () => "success 1",
          () => "success 2"
        ],
        finito)
        (state)
      .then(() => {
        expect(failo).not.toHaveBeenCalled()
        expect(finito).toHaveBeenCalled()
        done()
      })
  })

  it("reports failure in middle of failed promise chain", async done => {

    StepsList
      .run([
          () => "success 1",
          () => Promise.reject("failure 1"),
          () => "srccess 2"
        ],
        finito)
        (state)
      .catch(err => console.log("Test Failure", err))
      .then(() => {
        expect(failo).toHaveBeenCalledWith("failure 1")
        expect(finito).toHaveBeenCalled()
        done()
      })
  })
})
