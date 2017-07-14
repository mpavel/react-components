import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import OpeningHours from './component/opening-hours/OpeningHours';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Components</h2>
          <p>
            <small>To get started, edit <code>src/App.js</code> and save to reload.</small>
          </p>
        </div>

        <OpeningHours />

      </div>
    );
  }
}

export default App;
