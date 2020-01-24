import React, { useState } from 'react'

import {root} from '../dist/bundle.js'
import { stubMessageChannel } from "../src/mock"

stubMessageChannel()

// Run the scenario with cleanup
describe("Ensure loading main library works", () => {

  it("Works", done => {
    return done()
  })
})

  
  
