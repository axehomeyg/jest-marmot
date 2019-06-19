import { createBrowserHistory, createMemoryHistory } from 'history'

let history = (
  process.env.NODE_ENV === 'test' ? // eslint-disable-line
    createMemoryHistory({}) :
    createBrowserHistory({}))

export default history
