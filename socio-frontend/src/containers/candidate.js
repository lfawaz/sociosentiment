import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTweets } from '../actions/index'
import TrendSparklines from '../components/trend_sparklines'
import './candidate.css'

class Candidate extends Component  {
  componentWillMount(){
    this.props.getTweets(this.props.handle)
  }

wordCount(tweets){
  //Generate a list of words
  const tweetWords = [].concat(...tweets.map((tweet) => tweet.tweet.split(' '))).reduce((accu, nextWord) => {
    if(accu[nextWord] === undefined){
      accu[nextWord] = 1
    }
    else{
      accu[nextWord] += 1
    }
    return accu
  },{})

  return tweetWords
}

filterAndSort(tweetWords){

  const words = Object.keys(tweetWords)

  return words.filter(word => tweetWords[word] > 10).map((word) => ({[word]: tweetWords[word]}))
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
     console.log(this.props.handle)
     console.log(this.filterAndSort(this.wordCount(tweets)))

    return(
      <tr className="handle-row">
      <td>
      <img src={tweets[0].image} alt=""/>
      </td>

      <td>
      <TrendSparklines data={favorites} color={this.props.color} />
      </td>

      <td>
      <TrendSparklines data={retweets} color={this.props.color} />
      </td>

      </tr>
    )
  }
}

function mapStateToProps({ tweetsAll }){
  return { tweetsAll }
}

export default connect(mapStateToProps, { getTweets })(Candidate)
