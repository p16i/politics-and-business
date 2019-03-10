import React from 'react'

import { app, logo, footerContainer } from './app.css'

const App = React.createClass({
  render() {
    return (
      <main className={ app }>
        <div><img className={ logo } src="https://elect.in.th/wp-content/uploads/2018/10/site-logo.png"/></div>
        {this.props.children}
        <div className={ footerContainer }>
          ขอบคุณข้อมูลจาก <a href="#"><b>Creden.co</b></a>
        </div>
      </main>
    );
  }
});

export default App
