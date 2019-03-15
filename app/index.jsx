import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter as Router, Route, Switch, Redirect, hashHistory }
 from 'react-router-dom'
import { routes } from './routes'

import App from './components/App'
import Browse from './components/Browse'
import { config, isSmallScreen } from './utils'

import './components/shared/global.css'
import './index.css';


const TempRedirect = React.createClass({
  render() {
    const newPath = '/' + this.props.match.params.to
      .replace(/-/g, '/');
    console.log('newPath', newPath);
    return <Redirect to={newPath}/>
  }
})

const appCheckScreen = (props) => {
  if(isSmallScreen()){
    return <Redirect to="/browse"/>
  } return <App {...props}/>
}


ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/p/:partyName/person/:personName" render={appCheckScreen}/>
      <Route path="/p/:partyName/org/:orgID" render={appCheckScreen}/>
      <Route path="/p/:partyName" render={appCheckScreen}/>
      <Route path="/r/:to" component={TempRedirect} />
      <Route path="/browse" component={Browse} />
      <Route path="/" component={() => <Redirect to="/browse"/>} />
    </Switch>
  </Router>
, document.getElementById('app')
)
