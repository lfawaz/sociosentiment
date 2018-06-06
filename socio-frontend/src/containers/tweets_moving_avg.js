import React , { Component } from 'react'
import LineChart from '../components/line_chart'
import { connect } from 'react-redux'
import { getCandidateTweetsMovingAverage } from '../actions/index'

class TweetsMovingAvg extends Component {
  componentWillMount(){
    this.props.getCandidateTweetsMovingAverage(this.props.screen_name)
  }
  render(){
    if(!this.props.tweetsMovingAvg['likesMovingAverage']){
      return(<div>Tweets Moving Avg</div>)
    }else{
      const likesMovingAverage_dataset = this.props.tweetsMovingAvg['likesMovingAverage'].map((value, index) => {
        return { x: index, y: value }
      })

      const retweetsMovingAverage_dataset = this.props.tweetsMovingAvg['retweetsMovingAverage']

      const days = this.props.tweetsMovingAvg['days'].map(day => new Date(day).toLocaleDateString("en-US"))
      return(<div>
        <LineChart dataset={ likesMovingAverage_dataset } title={'Likes Moving Average'} labels={days} />
        <LineChart dataset={ retweetsMovingAverage_dataset } title={'Retweets Moving Average'} labels={days} />
        </div>)
    }


  }
}

function mapStateToProps({ tweetsMovingAvg }){
  return { tweetsMovingAvg }
}

export default connect(mapStateToProps, { getCandidateTweetsMovingAverage })(TweetsMovingAvg)
