import * as Dom from "../../src/marmot/dom"
import Page, {actions} from "../../src/marmot/page"

it("pins a finder specifically to labelText for a textfield", () => {

  const mockPage = 'page'
  const mockResultFunc = jest.fn(v => v)
  const mockFindFunc = jest.fn(() => ({then: mockResultFunc}))
  
  Dom.find = mockFindFunc
  Dom.type = jest.fn(v => v)

  Page(mockPage).fillIn("key", "value")

  expect(mockFindFunc).toHaveBeenCalledWith({labelText: "key"}, mockPage)
  expect(mockResultFunc).toHaveBeenCalledWith("value")
})

it("Lists all actions in page object, for external use", () => {
  expect(actions).toEqual([
    'click',
    'debug',
    'enter',
    'exec',
    'fillIn',
    'notSee',
    'see',
    'sleep',
    'visit'
  ])
})

it("Supports auxiliary debug functions", () => {
  const mockDebug  = {}
  Page({}).debug
  Page({}).enter
  Page({}).exec
  Page({}).sleep
})
