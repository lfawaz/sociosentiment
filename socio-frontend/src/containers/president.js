import React, { Component } from 'react'
import './president.css'
import { connect } from 'react-redux'
import Navbar from '../components/navbar'
import Candidate from './candidate'


class President extends Component {

  render(){
    const candidateList = this.props.candidateList.map(candidate => {
      return <Candidate  key={candidate.screen_name} screen_name={candidate.screen_name}/>
    })

    return(<div>
      <Navbar />
      <table>
      <tbody>
      {candidateList}
      </tbody>
      </table>
      </div>)
  }
}
function mapStateToProps({candidateList}){

  return { candidateList }
}

export default connect(mapStateToProps)(President)
