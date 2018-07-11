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
    this.getStartingDate = this.getStartingDate.bind(this)
  }

  loadData(screen_name){
      this.props.getCandidate(screen_name)
    }

  calculateAverage(tweets,value){
    //console.log(tweets)
    const startingDate = this.getStartingDate(this.props.filterValue)
    const filteredtweets = tweets.filter( tweet=> new Date(tweet.date) > startingDate )

     return Math.ceil(filteredtweets.map(tweet => tweet[value]).reduce((accu, nextValue)=> {
       return accu += nextValue
     },0)/filteredtweets.length)
  }

  getStartingDate(filterValue){
    const today = new Date()
    const startingDate = new Date(today.setMonth(today.getMonth() - filterValue))

    return startingDate
  }

  componentWillMount(){
    this.loadData(this.props.screen_name)
  }


  render(){

    //console.log(this.props.filterValue)
    if(!this.props.candidate){
      return (<div>loading</div>)
    }
    else{

      const { name, profile_image_url, followers_count, tweets, screen_name } = this.props.candidate
      const AvgRetweets = this.calculateAverage(tweets,'retweets')
      const AvgFavorites = this.calculateAverage(tweets, 'favorites')
      const EngagementFavorites = ((AvgFavorites/followers_count) * 100).toFixed(3)

      return(<div className="main-div">

        <div className="main-div-item"><img src={profile_image_url} alt="Not Available" /></div>
        <div className="main-div-item"><p>Name</p><div>{name}</div></div>
        <div className="main-div-item"><p>Followers</p><div>{followers_count}</div></div>
        <div className="main-div-item"><p>Average Retweets</p><div>{AvgRetweets}</div></div>
        <div className="main-div-item"><p>Average Favorites</p><div>{AvgFavorites}</div></div>
        <div className="main-div-item"><p>Engagement Favorites</p><div>{EngagementFavorites} %</div></div>
        <div className="main-div-item"><Link to={`/candidate/${screen_name}`} >More Details...</Link></div>

        </div>)
    }

  }
}

function mapStateToProps({ candidate },ownProps){

  return { candidate: candidate[ownProps.screen_name] }
}
export default connect(mapStateToProps, { getCandidate })(Candidate)
