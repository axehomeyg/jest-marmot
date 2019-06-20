// General utilities for use through
export const tap = returnable => callback => {
  callback(returnable)
  return returnable
}

export const dig = (path, tree) => path.reduce((ac, node) => ((ac && ac[node]) ? ac[node] : null), tree) // eslint-disable-line

export const yieldSelf = obj => func => func(obj)

export const callOrCreate = obj => k => v => (v ? (obj[k] = v) : obj[k]())

export const promise = callback => (new Promise(resolve => callback(resolve)))

export const K = x => y => x
