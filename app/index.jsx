import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { routes } from './routes'

import App from './components/App'
import { config } from './utils'

const Post = () => <h1>Post</h1>
const Project = () => <h1>Project</h1>

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
      <Route path="/posts" component={Post} />
      <Route path="/projects" component={Project} />
      <Route path="/" component={() => <Redirect to={ '/p/' + config.availableParties[0] }/>} />
    </Switch>
  </Router>
, document.getElementById('app')
)
