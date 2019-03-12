import React from 'react'

import { app, logo, footerContainer } from './app.css'
import Party from './Party';

const App = React.createClass({
  render() {
    return (
      <main className={ app }>
        <div><img className={ logo } src="https://elect.in.th/wp-content/uploads/2018/10/site-logo.png"/></div>
        <Party params={this.props.match.params} history={this.props.history}/>
        <div className={ footerContainer }>
          ข้อมูลจาก <a target="_blank" href="https://creden.co/creditscore/business">
            <b><img src="assets/images/creden.png"/></b>
          </a>
        </div>
      </main>
    );
  }
});

export default App