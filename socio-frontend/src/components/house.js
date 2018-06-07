import React, { Component } from 'react'
import Navbar from './navbar'
import USAMap from './us_map'

class House extends Component {
  render(){
    return (<div>
      <Navbar />
      <div><USAMap /></div>
      <div><div>Democrat Selected House candidate List</div><div>Republican Selected House candidate List</div></div>
      </div>)
  }
}

export default House
