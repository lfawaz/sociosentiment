import React, { Component } from 'react'
import Candidate from './candidate'
import { getTweets } from '../actions/index'
import { connect } from 'react-redux'
import ChartLine from '../components/chart'
import './home.css'

class Home extends Component {
  constructor(props){
    super(props)

    this.state={
                 leftSelectedHandle: '',
                 leftSelectedData: [],
                 rightSelectedHandle: '',
                 rightSelectedData: []
               }

    this.loadData  = this.loadData.bind(this)
    this.calculateAverage = this.calculateAverage.bind(this)
    this.returnFollowers = this.returnFollowers.bind(this)
    this.calculateMovingAverage = this.calculateMovingAverage.bind(this)
  }

  loadData(handle,side){
     const tweets = this.props.tweetsAll[handle]

      if(side === 'left'){
        this.setState({
          leftSelectedHandle: handle,
          leftSelectedData: tweets
        })
      }
else {
       this.setState({
         rightSelectedHandle: handle,
         rightSelectedData: tweets
     })
 }
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


  componentWillMount(){
    this.props.handleList.forEach(handle=> this.props.getTweets(handle[0]))
  }
  render(){
    const handleList = Object.keys(this.props.tweetsAll).map(handle=>(
      <option
        key={handle}

        >{handle}
        </option>
    ))
    console.log(this.calculateMovingAverage(this.state.leftSelectedData,'favorites'))
    const leftTweetsCount = this.state.leftSelectedData.length
    const rightTweetsCount = this.state.rightSelectedData.length
    return(<div className='app-div'>

    <div className='navbar-div'>

    <p>President</p>
    <p>Senate</p>
    <p>House</p>
    <p>Governer</p>

    </div>


    <div className='body-div'>

    <div className='side-body-div left-body-div'>
    <div className='side-body-list-div left-body-list-div'>
    <select onChange={(e)=> this.loadData(e.target.value,'left')}>
    <option value="">Please Select Candidate</option>
    {handleList}
    </select>
    </div>
    <div className='side-body-content-div left-body-content-div'>
    <Candidate handle={this.state.leftSelectedHandle} />
    <div>Tweets Counted: {leftTweetsCount}</div>
    <div>Average Favorites: {this.calculateAverage(this.state.leftSelectedData,'favorites')} </div>
    <div>Followers: {this.returnFollowers(this.state.leftSelectedData)} </div>
    <div>Average Retweets: {this.calculateAverage(this.state.leftSelectedData,'retweets')}</div>
    <div>Average Retweeters '%': {(this.calculateAverage(this.state.leftSelectedData,'retweets')/this.returnFollowers(this.state.leftSelectedData)*100).toFixed(2)}</div>
    <div>Average Favorites '%': {(this.calculateAverage(this.state.leftSelectedData,'favorites')/this.returnFollowers(this.state.leftSelectedData)*100).toFixed(2)}</div>
    <div><ChartLine data={this.calculateMovingAverage(this.state.leftSelectedData,'favorites')} labels={this.state.leftSelectedData.map((value,index)=> index.toString() )} label="Favorites Moving Average"/></div>
    </div>
    </div>

    <div className='side-body-div right-body-div'>
    <div className='side-body-list-div right-body-list-div'>
    <select onChange={(e)=> this.loadData(e.target.value,'right')}>
    <option value="">Please Select Candidate</option>
    {handleList}
    </select>

    </div>
    <div className='side-body-content-div right-body-content-div'>
    <Candidate handle={this.state.rightSelectedHandle} />
    <div>Tweets Counted: {rightTweetsCount}</div>
    <div>Average Favorites: {this.calculateAverage(this.state.rightSelectedData,'favorites')} </div>
    <div>Followers: {this.returnFollowers(this.state.rightSelectedData)} </div>
    <div>Average Retweets: {this.calculateAverage(this.state.rightSelectedData,'retweets')}</div>
    <div>Average Retweeters '%': {(this.calculateAverage(this.state.rightSelectedData,'retweets')/this.returnFollowers(this.state.rightSelectedData)*100).toFixed(2)}</div>
    <div>Average Favorites '%': {(this.calculateAverage(this.state.rightSelectedData,'favorites')/this.returnFollowers(this.state.rightSelectedData)*100).toFixed(2)}</div>
    <div><ChartLine data={this.calculateMovingAverage(this.state.rightSelectedData,'favorites')} labels={this.state.rightSelectedData.map((value,index)=> index.toString() )} label="Favorites Moving Average"/></div>
    </div>
    </div>

    </div>
    <div className='foot-div'>
    footer div
    </div>

    </div>)
  }
}

function mapStateToProps({ tweetsAll }){
  return { tweetsAll }
}


export default connect(mapStateToProps, { getTweets })(Home)
