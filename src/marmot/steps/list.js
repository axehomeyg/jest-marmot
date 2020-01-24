// individual step handler 
export const capture = list => func => (...args) => list.push(func(...args))

// Run all of the steps, as chained promises
export const run = (list, done) => state => (
  list
    .reduce((chain, func) => (
      chain.then(() => {
        console.log("Running", func, state)
        return func(state)
      })),
      Promise.resolve([]))
    .finally(() => {
      console.log("Done Running")
      done()
    })
)

