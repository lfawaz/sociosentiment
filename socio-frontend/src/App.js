import React, { Component } from 'react';
import './App.css';
import Candidate from './containers/candidate'

class App extends Component {
  render() {
    return (
      <div className="App">

      <Candidate candidate="hillaryclinton" color="red" />

      </div>
    );
  }
}

export default App;
