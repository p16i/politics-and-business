import React from 'react'

import Party from './Party';
import { app, logo, footerContainer } from './app.css'

const App = React.createClass({
  render() {
    return (
      <main className={ app }>
        <div><img className={ logo } src="https://elect.in.th/wp-content/uploads/2018/10/site-logo.png"/></div>
        <Party/>
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
