import React, { useState } from 'react'

import {stubMessageChannel} from '../dist/index.js'

stubMessageChannel()

// Run the scenario with cleanup
describe("Ensure loading main library works", () => {
  it("Works", done => {
    return done()
  })
})

