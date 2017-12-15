import React, { Component } from 'react'
import CandidateTrend from '../containers/candidate_trend'
import { Link } from 'react-router-dom'


class CandidateTrendList extends Component  {

  render(){
    const handleList = this.props.handleList

    const candidateTrendList = handleList.map((handle) => (
      <CandidateTrend key={handle[0]}  handle={handle[0]} color={handle[1]}/>
    ))

    return(
      <div>
      <div>
        <Link className="btn btn-primary" to='/cloud'>To Word Cloud</Link>
      </div>
    <table className="table table-hover">
    <thead>
    <tr>
      <th>Image</th>
      <th>Favorites</th>
      <th>Retweets</th>
    </tr>
    </thead>
    <tbody>
      {candidateTrendList}
      </tbody>
    </table>
    </div>

      )
  }
}


export default CandidateTrendList
