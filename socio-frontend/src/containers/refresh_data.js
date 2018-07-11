import React, { Component } from 'react'
import { connect } from 'react-redux'
import RefreshCandidate  from './refresh_candidate'

class RefreshData extends Component {

  render(){
      const presCandidates = this.props.candidateList.map(candidate => {
        return <RefreshCandidate key={candidate.screen_name} screen_name={candidate.screen_name} />
      })

      const senateCandidates = this.props.senateCandidateList.map(candidate => {
        return <RefreshCandidate key={candidate.screen_name} screen_name={candidate.screen_name} />
      })

      const governorCandidates = this.props.governorCandidateList.map(candidate => {
        return <RefreshCandidate key={candidate.screen_name} screen_name={candidate.screen_name} />
      })

      let candidates = presCandidates.concat(senateCandidates).concat(governorCandidates)

    return(
      <table>
      <tbody>
      {candidates}
      </tbody>
      </table>
    )

    }


}

function mapStateToProps({ candidateList, senateCandidateList, governorCandidateList }){
  return { candidateList, senateCandidateList, governorCandidateList }
}
export default connect(mapStateToProps)(RefreshData)
