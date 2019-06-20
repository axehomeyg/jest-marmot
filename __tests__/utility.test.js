import * as Utility from '../src/utility'

const transformKey = k => (k + "_" + k)

it("supports a tap operation (kestrel + func)", () => {
  const key = "key"
  const obj = {}
  expect(
      Utility.tap(key)(value => (obj[value] = transformKey(value))))
    .toEqual(key)

  expect(obj.key).toEqual(transformKey(key))

})
