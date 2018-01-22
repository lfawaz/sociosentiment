import React, { Component } from 'react'
import Candidate from './candidate'
import { connect } from 'react-redux'
import { getTweets } from '../actions/index'
import './home.css'
import Navbar from '../components/navbar'


class Home extends Component {
  constructor(props){
    super(props)

    this.state={
                 leftSelectedHandle: '',
                 rightSelectedHandle: ''
               }

    this.loadData  = this.loadData.bind(this)

  }

  loadData(handle,side){
    this.props.getTweets(handle)


      if(side === 'left'){
        this.setState({
          leftSelectedHandle: handle
        })
      }
else {
       this.setState({
         rightSelectedHandle: handle
     })
 }
  }


  render(){
    const handleList = this.props.handleList.map(handle=>(
      <option key={handle}>{handle}</option>
    ))



    return(<div className='app-div'>

    <Navbar />


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
    </div>
    </div>

    </div>
    <div className='foot-div'>
    footer div
    </div>

    </div>)
  }
}


export default connect(null,{ getTweets })(Home)
