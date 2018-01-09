import React, { Component } from 'react'
import Candidate from './candidate'
import { getTweets } from '../actions/index'
import { connect } from 'react-redux'
import './home.css'

class Home extends Component {
  constructor(props){
    super(props)

    this.state={ selectedHandle: '' }
    this.loadData  = this.loadData.bind(this)
  }

  loadData(handle){
    this.props.getTweets(handle)
    const tweets = this.props.tweetsAll[handle]
    if(!tweets){
      console.log("..loading",handle)
    }
    else{
    const minId = tweets.map(tweet=> tweet.Id).reduce((value, nextValue) => value > nextValue ? nextValue : value )
    this.props.getTweets(handle,minId)
    console.log(tweets)
  }
    // let counter = 0
    // while(counter<100){
    //   this.props.getTweets(handle,minId)
    //   counter += 1
    // }
  }
  render(){
    const handleList = this.props.handleList.map(handle=>(
      <p
        key={handle[0]}
        onClick={() => this.loadData(handle[0])}
        >{handle[0]}
        </p>
    ))
    return(<div className='app-div'>

    <div className='navbar-div'>
    Navbar
    </div>


    <div className='body-div'>

    <div className='side-body-div left-body-div'>
    <div className='side-body-list-div left-body-list-div'>
    {handleList}
    </div>
    <div className='side-body-content-div left-body-content-div'>
    <Candidate handle={this.state.selectedHandle} />
    </div>
    </div>

    <div className='side-body-div right-body-div'>
    <div className='side-body-list-div right-body-list-div'>
    {handleList}
    </div>
    <div className='side-body-content-div right-body-content-div'>
    <Candidate handle={this.state.selectedHandle} />
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
