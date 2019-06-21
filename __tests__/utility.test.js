import {callOrCreate, dig, K, tap, promise, yieldSelf} from '../src/utility'

const transformKey = k => (k + "_" + k)

describe("Combinators", () => {
  it("K - kestrel combinator", () => {
    expect(K("a")("b")).toEqual("a")
  })
})

it(".tap - supports a tap operation (kestrel + func)", () => {
  const key = "key"
  const obj = {}
  expect(
      tap(key)(value => (obj[value] = transformKey(value))))
    .toEqual(key)

  expect(obj.key).toEqual(transformKey(key))

})

it(".dig - deeply nested object tree query", () => {
  const nested = {
    a: "aa",
    b: {
      bb: "bbb",
      c: {
        cc: "cccc"}}}

  expect(dig(['b', 'c', 'cc'], nested)).toEqual("cccc")
  expect(dig(['ba', 'ck', 'pain'], nested)).toBeNull()
})

it(".callOrCreate - combination setter/getter", () => {
  const obj = {}
  
  const func = () => 'v'

  expect(callOrCreate(obj)('k')(func)()).toEqual('v')

  expect(callOrCreate(obj)('k')()).toEqual('v')
})

it('.promise - wrapper for simple happy path promise', () => (
  promise(resolve => resolve("a"))
  .then(res => expect(res).toEqual("a"))
  .catch(res => { console.log(".promise error", res) ; throw res})))

it(".yieldSelf - allows an inline block to receive a named expression result", () => {
  expect(yieldSelf(3 + 3)(sum => sum * 2)).toEqual(12)
})
