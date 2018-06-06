import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postCandidate } from '../actions/index'

class AddCandidate extends Component {
  constructor(props){
    super(props)

    this.state={input:''}
    this.downloadCandidate = this.downloadCandidate.bind(this)
  }

  downloadCandidate(screen_name){
    alert(`Downloading ${screen_name} Don't Submit Again`)
    this.props.postCandidate(screen_name)

  }

  render(){

      return(<div>
        <input type="text"
        onChange={e=> this.setState({input: e.target.value})}
        />
        <input type="button" value="Download Twitter User"
        onClick={e => this.downloadCandidate(this.state.input)}
        />
        </div>)

    }
  }


export default connect(null, { postCandidate })(AddCandidate)
