import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'react-svg-map/lib/index.css'
import './senate.css'
import Election from './election'

//Load All Races in Seat


class Senate extends Component {
  constructor(props){
    super(props)

    this.state = {
      senateRaces: {}
    }
  }

  componentWillMount(){

    const senateRaces = this.props.senateCandidateList.reduce((accu, nextValue) => {

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


    this.setState({ senateRaces })

  }

  render(){



    return (<div>
      <Election races={this.state.senateRaces}  />
      </div>)
  }
}

function mapStateToProps({ senateCandidateList }){
  return { senateCandidateList }
}

export default connect(mapStateToProps)(Senate)
