import React from 'react'

import { app } from './app.css'
import Party from './Party';
import Header from './Header';

const App = React.createClass({
  render() {
    return (
      <main className={ app }>
        <Header/> 
        <Party params={this.props.match.params} history={this.props.history}/>
      </main>
    );
  }
});

export default App
