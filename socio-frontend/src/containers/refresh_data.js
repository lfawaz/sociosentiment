import React, { Component } from 'react'
import { connect } from 'react-redux'
import RefreshCandidate  from './refresh_candidate'

class RefreshData extends Component {

  render(){

      let candidates = this.props.candidateList.map(candidate => {
        return <RefreshCandidate key={candidate.screen_name} screen_name={candidate.screen_name} />
      })
    return(
      <table>
      <tbody>
      {candidates}
      </tbody>
      </table>
    )

    }


}

function mapStateToProps({ candidateList }){
  return { candidateList }
}
export default connect(mapStateToProps)(RefreshData)
