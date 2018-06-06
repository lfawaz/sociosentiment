import React, { Component } from 'react'
import ChartLine from '../components/chart'
import { connect } from 'react-redux'
import * as Datetime from 'react-datetime'

class Candidate extends Component {

  constructor(props){
    super(props)

    this.state={startdate: 'Jan 01 00:00:00 +0000 2015'}
    this.calculateAverage = this.calculateAverage.bind(this)
    this.returnFollowers = this.returnFollowers.bind(this)
    this.calculateMovingAverage = this.calculateMovingAverage.bind(this)
  }

  calculateAverage(tweets,value){

     return Math.ceil(tweets.data.map(tweet => tweet[value]).reduce((accu, nextValue)=> {
       return accu += nextValue
     },0)/tweets.data.length)
  }

  returnFollowers(tweets){
    if(tweets.data.length === 0){
      return 0
    }else{
      return tweets.data[0]['followers']
    }
  }

  calculateMovingAverage(tweets, value){
    const data = tweets.data.map(tweet=> tweet[value])

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
    const data = this.props.data.filter(tweet => new Date(tweet.date) > new Date(this.state.startdate))
    const labels = data.map((value,index)=> index.toString() )
    const tweetDate = data.map((value,index)=> value.date.toString() )
    const TweetsCount = data.length
    return(
      <div>
      <div>{handle}</div>
      <Datetime
        inputProps={{placeholder:'Select Starting From Date'}}
        className="input-date-picker"
        onChange={(e) => this.setState({startdate:e._d})}
        />
      <div>Tweets Counted: {TweetsCount}</div>
      <div>Average Favorites: {this.calculateAverage({data},'favorites')} </div>
      <div>Followers: {this.returnFollowers({data})} </div>
      <div>Average Retweets: {this.calculateAverage({data},'retweets')}</div>
      <div>Retweeters/Follower Ratio: {(this.calculateAverage({data},'retweets')/this.returnFollowers({data})*100).toFixed(2)}</div>
      <div>Favorites/Follower Ratio: {(this.calculateAverage({data},'favorites')/this.returnFollowers({data})*100).toFixed(2)}</div>
      <div><ChartLine
        data={this.calculateMovingAverage({data},'favorites')}
        labels={labels}
        tweetDate={tweetDate}
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
