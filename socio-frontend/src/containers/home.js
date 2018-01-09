import React, { Component } from 'react'
import './home.css'

class Home extends Component {
  render(){
    const handleList = this.props.handleList.map(handle=>(
      <p key={handle[0]}>{handle[0]}</p>
    ))
    return(<div className='app-div'>

    <div className='navbar-div'>
    Navbar
    </div>


    <div className='body-div'>

    <div className='left-body-div'>
    {handleList}
    </div>

    <div className='right-body-div'>
    {handleList}
    </div>

    </div>
    <div className='foot-div'>
    footer div
    </div>

    </div>)
  }
}


export default Home
