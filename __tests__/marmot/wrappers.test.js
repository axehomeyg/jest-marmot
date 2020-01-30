import * as Wrappers from "../../src/marmot/wrappers"

it("records wrappers globally", () => {
  const { renderWrappers } = Wrappers.renderWrappers

  const wrap = jest.fn()

  Wrappers.renderWrappers = []

  expect(Wrappers
    .renderWrappers
    .length).toEqual(0)


  Wrappers.renderer(wrap)

  Wrappers.withWrappers()
   
  expect(wrap).toHaveBeenCalled()

  Wrappers.renderWrappers = renderWrappers
})

it("supports optioned wrapped calls, to allow redux/router/etc wrappers around a ReactDOM-rendered component", () => {

  const initial = 8

  const wrappers = {
    multiplier: (x, opts) => x * opts.value,
    subtractor: (x, opts) => x - opts.value,
    raiser: (x, opts) => Math.pow(x, opts.value)
  }

  expect(
    Wrappers
      .withWrappers(
        initial,
        {value: 2},
        Object.values(wrappers)))
    .toEqual(196)
})
