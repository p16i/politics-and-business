import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { routes } from './routes'

import App from './components/App'
import Browse from './components/Browse'
import { config } from './utils'

import './index.css';

const TempRedirect = React.createClass({
  render() {
    const newPath = '/' + this.props.match.params.to
      .replace(/-/g, '/');
    console.log('newPath', newPath);
    return <Redirect to={newPath}/>
  }
})

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/p/:partyName/person/:personName" component={App} />
      <Route path="/p/:partyName/org/:orgID" component={App} />
      <Route path="/p/:partyName" component={App} />
      <Route path="/r/:to" component={TempRedirect} />
      <Route path="/browse" component={Browse} />
      <Route path="/" component={() => <Redirect to={ '/p/' + config.availableParties[0] }/>} />
    </Switch>
  </Router>
, document.getElementById('app')
)
