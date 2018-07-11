import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCandidateTweetsByMonth } from '../actions/index'
import BarChart from '../components/bar_chart'

class TweetsByMonth extends Component {

  componentWillMount(){
    this.props.getCandidateTweetsByMonth(this.props.screen_name)
  }

  render(){

    const { tweetsByMonth } = this.props
    console.log(tweetsByMonth)
    if(Object.keys(tweetsByMonth).length === 0){
      return(<div>Loading...</div>)
    }else{
      const labels = Object.keys(this.props.tweetsByMonth)



      const avgLikes_dataset = Object.values(this.props.tweetsByMonth).map(value => value.likes/value.count)
      const avgRetweets_dataset = Object.values(this.props.tweetsByMonth).map(value => value.retweets/value.count)



      return(<div>

      <BarChart labels={labels}  dataset={avgLikes_dataset} title={"Average Likes Per Tweet"}/>
      <BarChart labels={labels}  dataset={avgRetweets_dataset} title={"Average Retweets Per Tweet"}/>


        </div>)
    }

  }
}

function mapStateToProps({ tweetsByMonth }){
  return { tweetsByMonth }
}

export default connect(mapStateToProps, { getCandidateTweetsByMonth })(TweetsByMonth)
