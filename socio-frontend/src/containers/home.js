import React, { Component } from 'react'
import ChartLine from '../components/chart'
import { connect } from 'react-redux'
import { getTweets } from '../actions/index'

class Home extends Component {
  componentWillMount(){
    this.props.getTweets('realdonaldtrump')
  }

  calculateMovingAverage(data){
    return data.map((value, index) => {
      const accu = data.slice(0,index+1).reduce((accu, value) => accu + value)
      return accu/(index+1)
    })
  }
  render(){
    //console.log(this.props.tweetsAll)
    
    const tweets = this.props.tweetsAll['realdonaldtrump']

     if(!tweets){
     return (
       <div>loading...{this.props.handle}</div>
     )
     }

     const favorites = tweets.map((tweet) => tweet.favorites)
     const favoritesMovingAverage = this.calculateMovingAverage(favorites)
     const labels = tweets.map((tweet,index) => index.toString())


    console.log(labels)
    return(<ChartLine data={favoritesMovingAverage} labels={labels} label="Favorites moving average"/>)
  }
}

function mapStateToProps({ tweetsAll }){
  return { tweetsAll }
}

export default connect(mapStateToProps, { getTweets })(Home)
