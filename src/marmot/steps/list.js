// individual step handler 
export const capture = list => func => (...args) => list.push(func(...args))

// Run all of the steps, as chained promises
export const run = list => state => (
  list
    .reduce((chain, func) => (
      chain.then(() => func(state))),
      Promise.resolve([])))

