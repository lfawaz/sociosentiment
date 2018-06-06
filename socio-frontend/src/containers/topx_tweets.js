import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTopXTweets } from '../actions/index'


class TopXTweets extends Component {
  componentWillMount(){

    const { screen_name , topx } = this.props
    this.props.getTopXTweets(screen_name, topx)

  }
  render(){

    if(!this.props.topxtweets[0]){
      return(<div>Loading</div>)
    }else{
      const topTweets = this.props.topxtweets.map((tweet, index) => {
        return <tr key={index}><td>{index + 1}</td><td>{tweet.text}</td><td>{tweet.likes}</td></tr>
      })
      return (<div><table>

        <tbody>
        <tr><th>Tweet</th><th># of Likes</th></tr>
        {topTweets}
        </tbody>
        </table></div>)
    }




  }
}

function mapStateToProps( { topxtweets }){
  return { topxtweets }
}

export default connect(mapStateToProps ,{ getTopXTweets })(TopXTweets)
