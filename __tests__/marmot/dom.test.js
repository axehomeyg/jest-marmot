import * as Dom from "../../src/marmot/dom"

it(".queryType - extracts query prefix from options", () => {
  expect(Dom.queryType()).toEqual("get")
  expect(Dom.queryType({})).toEqual("get")
  expect(Dom.queryType({queryType: "query"})).toEqual("query")
})

it(".queryParameters - maps querytype to dom query suffix", () => {
  const findersAndExpectedQuerySuffixes = [ 
    ['somefield',       ['ByText', 'somefield']],
    [{placeholder: 'p'}, ['ByPlaceHolderText', 'p']],
    [{testId: 'ti'}, ['ByTestId', 'ti']],
    [{text: 't'}, ['ByText', 't', {}]],
    [{text: 'ts', selector: 's'}, ['ByText', 'ts', {selector: 's'}]],
    [{labelText: 'l'}, ['ByLabelText', 'l']]]

  findersAndExpectedQuerySuffixes
    .forEach(pair => {
      expect(Dom.queryParameters(pair[0])).toEqual(pair[1])
    })
})

describe("errors", () => {
  const err = new Error()
  const { warn } = console

  beforeEach(() => {
    console.warn = jest.fn()
  })

  afterEach(() => {
    console.warn = warn 
  })

  it("reports on errors in wait", () => {
    expect(() => (
      Dom.findError(err))
        .toThrow(err))

    expect(console.warn).not.toHaveBeenCalled()
  })

  it("logs if debug env set", () => {
    const oldDebug = process.env.DEBUG
    process.env.DEBUG = true

    try {
      Dom.findError(err)
    }
    catch {
    }

    expect(console.warn).toHaveBeenCalled()
      
    process.env.DEBUG = oldDebug
    
  })
})

describe("#visit", () => {
  const oldMarmotGlobals = global.marmotGlobals
  const { location } = global.window
 
  const url = "/"

  beforeEach(() => {
    delete global.window.location
  })

  afterEach(() => {
    global.marmotGlobals = oldMarmotGlobals
    global.window.location = location 
  })
  //
  it("prefers marmot location handler", () => {

    const replace = jest.fn()
    global.marmotGlobals = {
      router: () => ({ replace })
    }

    global.window.location = {
      assign: jest.fn()
    }

    Dom.visit(url)

    expect(replace).toHaveBeenCalledWith(url)
  })

  it("prefers marmot location handler", () => {

    const assignFunc = jest.fn()

    global.marmotGlobals = {
      router: () => ({ })
    }

    global.window.location = {
      assign: assignFunc
    }

    Dom.visit(url)

    expect(assignFunc).toHaveBeenCalledWith(url)

  })


})
