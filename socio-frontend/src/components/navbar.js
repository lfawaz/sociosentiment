import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

class Navbar extends Component {
  render(){
    return(    <div className='navbar-div'>

        <Link to='/'><p>Home</p></Link>
        <Link to='/President'> <p>President</p></Link>
        <Link to='/Senate'><p>Senate</p></Link>
        <Link to='House'><p>House</p></Link>
        <Link to='Governor'><p>Governor</p></Link>

        </div>
)
  }
}

export default Navbar
