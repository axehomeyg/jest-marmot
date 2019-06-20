import * as Dom from "../../src/marmot/dom"
import Page from "../../src/marmot/page"

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
