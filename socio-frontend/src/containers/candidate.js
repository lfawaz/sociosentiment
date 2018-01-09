import React, { Component } from 'react'


class Candidate extends Component {
  render(){
    const {handle} = this.props
    return(
      <div>{handle}</div>
    )
  }
}

export default Candidate
