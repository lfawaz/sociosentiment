import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTweets } from '../actions/index'
import ChartLine from '../components/chart'
import './candidate.css'

class CandidateTrend extends Component  {
  componentWillMount(){
    this.props.getTweets(this.props.handle)
  }
  calculateMovingAverage(data){
    return data.map((value, index) => {
      const accu = data.slice(0,index+1).reduce((accu, value) => accu + value)
      return accu/(index+1)
    })
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
     const tweetText = tweets.map((tweet) => tweet.tweet)

     const favoritesMovingAverage = this.calculateMovingAverage(favorites)
     const retweetsMovingAverage = this.calculateMovingAverage(retweets)
     const labels = tweets.map((tweet,index) => index.toString())

    return(

      <tr className="handle-row">

        <td>

          <img src={tweets[0].image} alt=""/>
          <p>{this.props.handle}</p>
          </td>
        <td>
          <ChartLine data={favoritesMovingAverage} tweetText={tweetText} labels={labels} label="Favorites moving average"/>
          </td>
        <td>
          <ChartLine data={retweetsMovingAverage} labels={labels} label="retweets moving average"/>
          </td>

      </tr>




    )
  }
}

function mapStateToProps({ tweetsAll }){
  return { tweetsAll }
}

export default connect(mapStateToProps, { getTweets })(CandidateTrend)
