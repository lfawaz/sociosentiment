import React, { Component } from 'react'
import { connect } from 'react-redux'
import TweetsByMonth from './tweets_by_month'
import TweetsMovingAvg from './tweets_moving_avg'
import TopXTweets from './topx_tweets'
import TopXWords from './topx_words'
import { getCandidate } from '../actions/index'

class CandidateDetail extends Component {

  render(){

    const { screen_name } = this.props.match.params


    if(!this.props.candidate){
      this.props.getCandidate(screen_name)
      return(<div>Loading..</div>)
    }
    else{

      const { name } = this.props.candidate

      return (<div>
        <div>{screen_name}</div>
        <div>{ name }</div>
        <div><TweetsByMonth screen_name={ screen_name } /></div>
        <div><TopXTweets screen_name={screen_name} topx={10}/></div>
        <div><TopXWords screen_name={screen_name} topx={20}/></div>
        <div><TweetsMovingAvg screen_name={ screen_name } /></div>
        <div>[Sentimement Using Stanford NLP]</div>
        </div>)
    }





  }
}

function mapStateToProps({ candidate }, ownProps){
  return { candidate: candidate[ownProps.match.params.screen_name] }
}

export default connect(mapStateToProps, { getCandidate })(CandidateDetail)
