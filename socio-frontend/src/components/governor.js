import React, { Component } from 'react'
import Navbar from './navbar'
import USAMap from './us_map'
class Governor extends Component {
  render(){
    return (<div>
      <Navbar />
      <div><USAMap /></div>
      <div><div>Democrat Selected Governor candidate List</div><div>Republican Selected Governor candidate List</div></div>
      </div>)
  }
}

export default Governor
