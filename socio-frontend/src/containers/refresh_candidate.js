import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCandidate, postCandidate, refreshCandidate } from '../actions/index'

class RefreshCandidate extends Component {

  componentWillMount(){
    const screen_name = this.props.screen_name
    this.props.getCandidate(screen_name)
  }

  render(){

    if(!this.props.candidate){
      return(<tr><td>Refreshing</td></tr>)
    }else{

      const screen_name = this.props.screen_name
      const sinceId = this.props.candidate.tweets.map(tweet => tweet.id)
                                      .reduce((value, nextValue) => value < nextValue ? nextValue : value )

      const dates = this.props.candidate.tweets.map(tweet => new Date(tweet.date))
      const maxDate = new Date(Math.max.apply(null, dates))

      this.props.refreshCandidate(screen_name, sinceId)
      return(<tr><td>{screen_name}:</td><td>{maxDate.toString()}</td></tr>)

    }

  }
}

function mapStateToProps({ candidate },ownProps){

  return { candidate: candidate[ownProps.screen_name] }
}
export default connect(mapStateToProps, { postCandidate, getCandidate, refreshCandidate })(RefreshCandidate)
