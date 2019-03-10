import React from 'react'
import { Route } from 'react-router'

import App from './components/App'
import Party from './components/Party'

export const routes = (
  <Route component={App}>
    <Route path="/" component={Party} />
  </Route>
)
