import React from 'react'
import ReactDOM from 'react-dom'

import ReactGA from 'react-ga'
import { createHashHistory } from 'history'

import { HashRouter as Router, Route, Switch, Redirect, hashHistory }
 from 'react-router-dom'
import { routes } from './routes'

import App from './components/App'
import Browse from './components/Browse'
import GovSpendingTutorial from './components/GovSpendingTutorial'

import { config, isSmallScreen } from './utils'

import './components/shared/global.css'
import './index.css';

ReactGA.initialize('UA-48736618-5');

const history = createHashHistory()

history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});



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
    alert(`ผลงานชิ้นนี้เหมาะกับการดูบนจอขนาดความกว้าง 1280px ขึ้นไป (ขนาดความกว้างปัจจุบันคือ ${window.innerWidth}px)`);
  } 

  return <App {...props}/>
}

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/p/:partyName/person/:personName" render={appCheckScreen}/>
      <Route path="/p/:partyName/org/:orgID" render={appCheckScreen}/>
      <Route path="/p/:partyName" render={appCheckScreen}/>
      <Route path="/r/:to" component={TempRedirect} />
      <Route path="/g/:orgID" component={GovSpendingTutorial} />
      <Route path="/browse" component={Browse} />
      <Route path="/" component={() => <Redirect to="/browse"/>} />
    </Switch>
  </Router>
, document.getElementById('app')
)
