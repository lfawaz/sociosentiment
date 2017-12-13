import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTweets } from '../actions/index'
import TrendSparklines from '../components/trend_sparklines'

class Candidate extends Component  {
  componentWillMount(){
    this.props.getTweets(this.props.candidate)
  }
  render(){
    const favorites = this.props.tweets.map((tweet) => tweet.favorites)

    return(
    <ul>
        <TrendSparklines data={favorites} color={this.props.color} />
      </ul>)
  }
}

function mapStateToProps({ tweets }){
  return { tweets }
}

export default connect(mapStateToProps, { getTweets })(Candidate)
