import * as Dom from "../../src/marmot/dom"
// import Page, {actions} from "../../src/marmot/page"
// jest.mock("../../src/marmot/dom")
//
//

it(".queryType - extracts query prefix from options", () => {
  expect(Dom.queryType()).toEqual("get")
  expect(Dom.queryType({})).toEqual("get")
  expect(Dom.queryType({queryType: "query"})).toEqual("query")
})

it(".queryPlan - maps finder to querytype", () => {
  const findersAndExpectedQueryTypes = [ 
    ['somefield', 'inlineText'],
    [{placeholder: "enter email"}, 'placeholder'],
    [{testId: "signup"}, 'testId'],
    [{text: 'Email'}, 'text'],
    [{labelText: 'Email Field'}, 'label'],
    [{weirdOptions: 'somefield'}, undefined]
  ]

  findersAndExpectedQueryTypes.forEach(pair => {
    expect(Dom.queryPlan(pair[0])).toEqual(pair[1])
  })
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

