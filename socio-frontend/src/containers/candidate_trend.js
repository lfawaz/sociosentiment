import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTweets } from '../actions/index'
import TrendSparklines from '../components/trend_sparklines'
import './candidate.css'

class CandidateTrend extends Component  {
  componentWillMount(){
    this.props.getTweets(this.props.handle)
  }

  render(){

    const tweets = this.props.tweetsAll[this.props.handle]
     if(!tweets){
     return (
       <div>loading...{this.props.handle}</div>
     )
     }

     const favorites = tweets.map((tweet) => tweet.favorites)
     const retweets  = tweets.map((tweet) => tweet.retweets)



    return(

      <tr className="handle-row">

        <td>

          <img src={tweets[0].image} alt=""/>
          <p>{this.props.handle}</p>
          </td>
        <td>
          <TrendSparklines data={favorites} color={this.props.color}/>
          </td>
        <td>
          <TrendSparklines data={retweets} color={this.props.color}/>
          </td>

      </tr>




    )
  }
}

function mapStateToProps({ tweetsAll }){
  return { tweetsAll }
}

export default connect(mapStateToProps, { getTweets })(CandidateTrend)
