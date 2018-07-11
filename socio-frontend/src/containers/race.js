import React, { Component } from 'react'
import Candidate from './candidate'
import { connect } from 'react-redux'
import './race.css'
class Race extends Component {


  render() {
    const candidateList = this.props.candidateList.map(candidate => {
      return <Candidate  key={candidate.screen_name} screen_name={candidate.screen_name} filterValue={this.props.filterValue}/>
    })

    return (<div className='race-div'>
      <div className="race-name-div"><p>{this.props.race}</p></div>
      {candidateList}
      </div>)
  }
}

export default connect()(Race)
