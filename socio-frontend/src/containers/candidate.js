import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCandidate } from '../actions/index'
import { Link } from 'react-router-dom'
import './candidate.css'


class Candidate extends Component {

  constructor(props){
    super(props)

    this.loadData = this.loadData.bind(this)
    this.calculateAverage = this.calculateAverage.bind(this)
  }

  loadData(screen_name){
      this.props.getCandidate(screen_name)
    }

  calculateAverage(tweets,value){

     return Math.ceil(tweets.map(tweet => tweet[value]).reduce((accu, nextValue)=> {
       return accu += nextValue
     },0)/tweets.length)
  }

  componentWillMount(){
    this.loadData(this.props.screen_name)
  }


  render(){

    if(!this.props.candidate){
      return (<tr><td>loading</td></tr>)
    }
    else{

      const { name, profile_image_url, followers_count, location, tweets, screen_name } = this.props.candidate
      const AvgRetweets = this.calculateAverage(tweets,'retweets')
      const AvgFavorites = this.calculateAverage(tweets, 'favorites')

      return(<tr className="main-div">

        <td><img src={profile_image_url} alt="Not Available" /></td>
        <td><p>Name</p><p>{name}</p></td>
        <td><p>Followers</p><p>{followers_count}</p></td>
        <td><p>location</p><p>{location}</p></td>
        <td><p>Average Retweets</p><p>{AvgRetweets}</p></td>
        <td><p>Average Favorites</p><p>{AvgFavorites}</p></td>
        <td><Link to={`/candidate/${screen_name}`} >More Details...</Link></td>

        </tr>)
    }

  }
}

function mapStateToProps({ candidate },ownProps){

  return { candidate: candidate[ownProps.screen_name] }
}
export default connect(mapStateToProps, { getCandidate })(Candidate)
