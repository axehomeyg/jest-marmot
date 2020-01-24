import React, { useState } from 'react'

import {root} from '../lib/jest-marmot.js'

window.MessageChannel = require('worker_threads').MessageChannel

// Run the scenario with cleanup
describe("Ensure loading main library works", () => {

  it("Works", done => {
    console.log("working", done)
    return done()
  })
})

  
  
