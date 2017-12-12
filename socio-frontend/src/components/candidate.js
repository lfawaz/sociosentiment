import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTweets } from '../actions/index'

class Candidate extends Component  {
  componentWillMount(){
    this.props.getTweets('realDonaldTrump')
  }
  render(){
    const tweets = this.props.tweets.map((tweet) => (
      <li key={tweet.tweet}>{tweet.tweet}</li>
    ))
    return(<ul>
      {tweets}
    </ul>)
  }
}

function mapStateToProps({ tweets }){
  return { tweets }
}

export default connect(mapStateToProps, { getTweets })(Candidate)
