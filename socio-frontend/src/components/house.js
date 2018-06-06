import React, { Component } from 'react'
import Navbar from './navbar'

class House extends Component {
  render(){
    return (<div>
      <Navbar />
      <div>US Map</div>
      <div><div>Democrat Selected House candidate List</div><div>Republican Selected House candidate List</div></div>
      </div>)
  }
}

export default House
