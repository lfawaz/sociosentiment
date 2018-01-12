import React, { Component } from 'react'
import ChartLine from '../components/chart'
import { connect } from 'react-redux'

class Candidate extends Component {

  constructor(props){
    super(props)

    this.calculateAverage = this.calculateAverage.bind(this)
    this.returnFollowers = this.returnFollowers.bind(this)
    this.calculateMovingAverage = this.calculateMovingAverage.bind(this)
  }

  calculateAverage(tweets,value){
    return Math.ceil(tweets.map(tweet => tweet[value]).reduce((accu, nextValue)=> {
      return accu += nextValue
    },0)/tweets.length)
  }

  returnFollowers(tweets){
    if(tweets.length === 0){
      return 0
    }else{
      return tweets[0]['followers']
    }
  }

  calculateMovingAverage(tweets, value){
    const data = tweets.map(tweet=> tweet[value])

      return data.map((value, index) => {
        const accu = data.slice(0,index+1).reduce((accu, value) => accu + value)
        return accu/(index+1)
      })
  }


  render(){
    if(this.props.handle === ""){
      return(<div></div>)
    }
    if(!this.props.data){
      return(<div>Loading data for ... {this.props.handle}</div>)
    }
    const {handle} = this.props
    const TweetsCount = this.props.data.length
    return(
      <div>
      <div>{handle}</div>
      <div>Tweets Counted: {TweetsCount}</div>
      <div>Average Favorites: {this.calculateAverage(this.props.data,'favorites')} </div>
      <div>Followers: {this.returnFollowers(this.props.data)} </div>
      <div>Average Retweets: {this.calculateAverage(this.props.data,'retweets')}</div>
      <div>Retweeters/Follower Ratio: {(this.calculateAverage(this.props.data,'retweets')/this.returnFollowers(this.props.data)*100).toFixed(2)}</div>
      <div>Favorites/Follower Ratio: {(this.calculateAverage(this.props.data,'favorites')/this.returnFollowers(this.props.data)*100).toFixed(2)}</div>
      <div><ChartLine
        data={this.calculateMovingAverage(this.props.data,'favorites')}
        labels={this.props.data.map((value,index)=> index.toString() )}
        tweetDate={this.props.data.map((value,index)=> value.date.toString() )}
        label="Favorites Moving Average"/>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ tweetsAll }, ownProps){
  return { data: tweetsAll[ownProps.handle] }
}

export default connect(mapStateToProps)(Candidate)
