import React, { Component } from 'react'
import Navbar from './navbar'
import USAMap from './us_map'

class Senate extends Component {
  render(){
    return (<div>
      <Navbar />
      <div><USAMap /></div>
      <div><div>Democrat Selected Senate candidate List</div><div>Republican Selected Senate candidate List</div></div>
      </div>)
  }
}

export default Senate
