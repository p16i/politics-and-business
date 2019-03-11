import React from 'react'
import { Route } from 'react-router'

import { App } from './components/App'
import { Party } from './components/Party'


const dummyPage = () => {
  return <div>2222</div>
}


export const routes = (
  <div>
      <Route path="/p/:party" component={dummyPage} />
      <Route path="/" component={dummyPage} />
  </div>
)
