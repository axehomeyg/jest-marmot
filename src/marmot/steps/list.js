// individual step handler 
export const capture = list => func => (...args) => list.push(func(...args))

// Run all of the steps, as chained promises
export const run = (list, done) => state => (
  list
    .reduce((chain, func) => (
      chain.then(() => {
        return func(state)
      })
    ), Promise.resolve([]))
    .catch(err => (
      (done && done.fail) ?
        done.fail(err) :
        done(err)))
    .finally(res => {
      done()
    })
)

