import * as Dom from "../../src/marmot/dom"
import * as RTL from "@testing-library/react"
import userEvent from "@testing-library/user-event"

jest.mock("@testing-library/react", () => ({
  act: cb => cb(),
  render: jest.fn(),
  fireEvent: {
    keyDown: jest.fn()
  },
  waitForElement: jest.fn(f => Promise.resolve(f()))}))

jest.mock("@testing-library/user-event", () => ({}))

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

it(".asyncCall - abstract away syntax for asynchronous event handlers", async done => {
  const finisher = d => Promise.resolve(d())

  Dom.asyncCall(finisher)(done)
})

it(".finderFunction - query builder for jsdom", () => {
  const dom = { getByText: jest.fn() }

  Dom.finderFunction(dom)(["ByText", "a", "b"], "get")

  expect(dom.getByText).toHaveBeenCalledWith("a", "b")
})


it(".find - bring together all query params into a jsdom query ", async done => {
  Dom
    .find("stuff", { getByText: jest.fn() })
    .then(done)
})

describe("Events", () => {

  const el = "element"

  it(".click - ", () => {
    userEvent.click = jest.fn()

    Dom.click(el)

    expect(userEvent.click).toHaveBeenCalledWith(el)
  })

  it(".enter - ", () => {
    Dom.enter(el)

    expect(RTL.fireEvent.keyDown)
      .toHaveBeenCalledWith(
        el,
        { key: 'Enter', keyCode: 13, which: 13 })
  })

  it(".type - ", () => {
    const content = "stuff"

    userEvent.type = jest.fn()

    Dom.type(content)(el)

    expect(userEvent.type).toHaveBeenCalledWith(el, content)
  })
})

it(".render - wraps testing-library's renderer with our wrappers", () => {
  Dom.render("")

  expect(RTL.render).toHaveBeenCalled()
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
