import React, { Component } from 'react'
import CandidateWord from '../containers/candidate_word'
import { Link } from 'react-router-dom'


class CandidateWordList extends Component  {

  render(){
    const handleList = this.props.handleList

    const candidateWordList = handleList.map((handle) => (
      <CandidateWord key={handle[0]}  handle={handle[0]} color={handle[1]}/>
    ))

    return(
      <div>
      <div>
        <Link className="btn btn-primary" to='/trend'>To Trends</Link>
      </div>
    <table className="table table-hover">
    <thead>
    <tr>
      <th>Image</th>
      <th>Frequency</th>
      <th>Favorites</th>
      <th>Retweets</th>
    </tr>
    </thead>
    <tbody>
      {candidateWordList}
      </tbody>
    </table>
    </div>


      )
  }
}


export default CandidateWordList
