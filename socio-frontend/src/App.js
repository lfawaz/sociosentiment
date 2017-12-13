import React, { Component } from 'react';
import './App.css';
import CandidateList from './components/candidate_list'

class App extends Component {
  render() {
    return (
      <div className="App">
      <CandidateList />
      </div>
    );
  }
}

export default App;
