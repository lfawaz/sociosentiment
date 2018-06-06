import React, { Component } from 'react'
import './home.css'
import { connect } from 'react-redux'
import Navbar from '../components/navbar'


class Home extends Component {

  render(){


    return(<div>
      <Navbar />
      <table>
      <tbody>
      <tr><th>Democrat</th><th>Republican</th></tr>
      <tr><td>All Democrat</td><td>All Republican</td></tr>
      <tr><td>Senate Democrat</td><td>Senate Republican</td></tr>
      <tr><td>House Democrat</td><td>House Republican</td></tr>
      <tr><td>Governor Democrat</td><td>Governor Republican</td></tr>
      </tbody>
      </table>
      </div>)
  }
}


export default connect()(Home)
