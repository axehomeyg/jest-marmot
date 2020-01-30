import * as Index from "../src/index"
import * as Callbacks from "../src/marmot/callbacks"

const globals = global.marmotGlobals

beforeEach(() => {
  Callbacks.setGlobals()
})

afterEach(() => {
  Callbacks.setGlobals(globals)
})

it("gives accessors for global test elements", () => {
  expect(global.marmotGlobals.callbacks.begin).toHaveLength(0)
  expect(global.marmotGlobals.callbacks.cleanup).toHaveLength(0)

  const root = "I am gRoot"

  const router = "Roto Router"

  const begin = jest.fn()

  const clean = jest.fn()

  Index.root(() => root)

  Index.router(() => router)

  Index.on("begin")(begin)
  
  Index.on("cleanup")(clean)

  Index.run("begin")
  
  Index.cleanup()

  expect(Index.root()).toEqual(root)

  expect(Index.router()).toEqual(router)

  expect(begin).toHaveBeenCalled()

  expect(clean).toHaveBeenCalled()
})

