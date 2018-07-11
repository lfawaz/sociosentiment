import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'react-svg-map/lib/index.css'
import './senate.css'
import Election from './election'

//Load All Races in Seat


class Governor extends Component {
  constructor(props){
    super(props)

    this.state = {
      governorRaces: {}
    }
  }

  componentWillMount(){

    const governorRaces = this.props.governorCandidateList.reduce((accu, nextValue) => {

      const race = nextValue.state
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


    this.setState({ governorRaces })

  }

  render(){



    return (<div>
      <Election races={this.state.governorRaces} states={this.state.governorRaces} />
      </div>)
  }
}

function mapStateToProps({ governorCandidateList }){
  return { governorCandidateList }
}

export default connect(mapStateToProps)(Governor)
