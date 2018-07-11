import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'react-svg-map/lib/index.css'
import './senate.css'
import Election from './election'

//Load All Races in Seat


class House extends Component {
  constructor(props){
    super(props)

    this.state = {
      houseRaces: {}
    }
  }

  componentWillMount(){

    const houseRaces = this.props.houseCandidateList.filter(candidate => candidate.screen_name.length > 5).reduce((accu, nextValue) => {

      const race = nextValue.district
      const state = nextValue.state

      const candidate = {
        screen_name: nextValue.screen_name,
        party: nextValue.party
      }

      if (!accu[race]){
        accu[race] = {
            candidates : [],
            state: state
      }
    }
      accu[race].candidates.push(candidate)

      return accu
    },{})



    this.setState({ houseRaces })

  }

  render(){
  


    return (<div>
      <Election races={this.state.houseRaces} />
      </div>)
  }
}

function mapStateToProps({ houseCandidateList }){
  return { houseCandidateList }
}

export default connect(mapStateToProps)(House)
