import * as Dom from "../../src/marmot/dom"
import Page, {actions} from "../../src/marmot/page"
jest.mock("../../src/marmot/dom")

describe("Fill In", () => {
  it("pins a finder specifically to labelText for a textfield", () => {
    const mockPage = 'page'
    const mockResultFunc = jest.fn(v => v)
    const mockFindFunc = jest.fn(() => ({then: mockResultFunc}))
    const mockFindFunc2 = jest.fn(() => ({then: mockResultFunc}))
    Dom.type = jest.fn(v => v)
    
    Dom.find = mockFindFunc
    Page(mockPage).fillIn("key", "value")
    expect(mockFindFunc).toHaveBeenCalledWith({labelText: "key"}, mockPage)
    expect(mockResultFunc).toHaveBeenCalledWith("value")

    Dom.find = mockFindFunc2
    Page(mockPage).fillIn({labelText: "key"}, "value")
    expect(mockFindFunc2).toHaveBeenCalledWith({labelText: "key"}, mockPage)
    expect(mockResultFunc).toHaveBeenCalledWith("value")
  })
})

it("Supports auxiliary debug functions", () => {
  const mockDebug  = jest.fn() 

  Page({debug: mockDebug}).debug()

  expect(mockDebug).toHaveBeenCalled()
})

it("Supports enter functions", () => {
  const func = jest.fn()

  Dom.enter = func

  const mockResultFunc = jest.fn(v => v())
  const mockFindFunc = jest.fn(() => ({then: mockResultFunc}))
  Dom.find = mockFindFunc

  Page({}).enter("")

  expect(mockResultFunc).toHaveBeenCalledWith(func)
})

it("Supports arbitrary code execution as a step", () => {
  const func = jest.fn()

  Page({}).exec(func)

  expect(func).toHaveBeenCalled()
})


it("Supports sleep to debug", done => Page({}).sleep(0).then(done))
