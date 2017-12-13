import React, { Component } from 'react'
import Candidate from '../containers/candidate'

const handleList = [['realdonaldtrump','red'],['hillaryclinton','blue'],['SenJohnMcCain','red'],['barackobama','blue']]

class CandidateList extends Component  {

  render(){
    const candidateList = handleList.map((handle) => (
      <Candidate key={handle[0]}  handle={handle[0]} color={handle[1]}/>
    ))

    return(
    <table className="table table-hover">
    <thead>
    <tr>
      <th>Image</th>
      <th>Favorites</th>
      <th>Retweets</th>
    </tr>
    </thead>
    <tbody>
      {candidateList}
      </tbody>
    </table>

      )
  }
}


export default CandidateList
