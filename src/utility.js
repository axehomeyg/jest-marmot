// Useful combinators
export const K = x => y => x

// General utilities
export const tap = returnable => callback => K(returnable)(callback(returnable))

export const dig = (path, tree) => path.reduce((ac, node) => ((ac && ac[node]) ? ac[node] : null), tree)

export const yieldSelf = obj => func => func(obj)

export const callOrCreate = obj => k => v => (v ? (obj[k] = v) : obj[k]())

export const promise = callback => (new Promise(resolve => callback(resolve)))

