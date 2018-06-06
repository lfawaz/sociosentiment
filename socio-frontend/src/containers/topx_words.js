import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTopXWords } from '../actions/index'


class TopXWords extends Component {
  componentWillMount(){

    const { screen_name , topx } = this.props
    this.props.getTopXWords(screen_name, topx)

  }
  render(){
  
    if(!this.props.topxwords[0]){
      return(<div>Loading</div>)
    }else{
      const topWords = this.props.topxwords.map((tweet, index) => {
        return <tr key={index}><td>{index + 1}</td><td>{tweet.text}</td><td>{tweet.favorites}</td></tr>
      })
      return (<div><table>

        <tbody>
        <tr><th>Tweet</th><th># of Likes</th></tr>
        {topWords}
        </tbody>
        </table></div>)
    }


  }
}

function mapStateToProps( { topxwords }){
  return { topxwords }
}

export default connect(mapStateToProps ,{ getTopXWords })(TopXWords)
