import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTweets } from '../actions/index'
import SimpleCloud from '../components/tag_cloud'

import './candidate.css'

class CandidateWord extends Component  {
  componentWillMount(){
    this.props.getTweets(this.props.handle)
  }


mapWordToMeasure(tweetWord){
  return tweetWord.words.map((word) => ({         text: word,
                                                  favorites: tweetWord.favorites,
                                                  retweets: tweetWord.retweets,
                                                  count: 1

                        }))
}

wordSummary(tweets){
  //Generate a list of words
  const tweetWords = [].concat(...tweets.map((tweet) => ({ words: tweet.tweet.split(' '),
                                                           favorites: tweet.favorites,
                                                           retweets: tweet.retweets


                                                        }) ))

  return [].concat([],...tweetWords.map(tweetWord => this.mapWordToMeasure(tweetWord))).reduce((accu, nextValue) => {

    if(accu.filter((obj) => obj.text === nextValue.text).length === 0){
      accu.push(nextValue)
    }else{
      for (var i = 0; i < accu.length; i++) {
        if(accu[i].text === nextValue.text){
          accu[i].count += nextValue.count
          accu[i].favorites += nextValue.favorites
          accu[i].retweets += nextValue.retweets
        }
      }
    }

    return accu

  },[]).filter(word => word.count > 1)


}


  render(){

    const tweets = this.props.tweetsAll[this.props.handle]
     if(!tweets){
     return (
       <div>loading...{this.props.handle}</div>
     )
     }


     const tagCloudCount = this.wordSummary(tweets).map((word)=> ({ value: word.text, count: word.count})).sort(function(a,b){
       return b.count - a.count
     }).slice(1,21)
     const tagCloudFavorite = this.wordSummary(tweets).map((word)=> ({ value: word.text, count: word.favorites/word.count})).sort(function(a,b){
       return b.count - a.count
     }).slice(1,21)
     const tagCloudRetweet = this.wordSummary(tweets).map((word)=> ({ value: word.text, count: word.retweets/word.count})).sort(function(a,b){
       return b.count - a.count
     }).slice(1,21)
     const tweetsAfter =  tweets.map(tweet=> new Date(tweet.date).toLocaleDateString()).reduce((value, nextValue)=> value > nextValue ? nextValue : value)
     const minId = {tweets}.tweets.map(tweet=> tweet.Id).reduce((value, nextValue) => value > nextValue ? nextValue : value )


    return(

      <tr className="handle-row">
        <td>
          <img src={tweets[0].image} alt=""/>

          <p>{this.props.handle} tweets After: {tweetsAfter}</p>
          </td>
        <td>
          <SimpleCloud data={tagCloudCount}/>
          </td>
        <td>
          <SimpleCloud data={tagCloudFavorite}/>
          </td>
          <td>
          <SimpleCloud data={tagCloudRetweet}/>
          </td>
          <td className="btn btn-warning"
          onClick={()=> {
            this.props.getTweets(this.props.handle,{minId})}
        }
          >Go Back
          </td>
      </tr>



    )
  }
}

function mapStateToProps({ tweetsAll }){
  return { tweetsAll }
}

export default connect(mapStateToProps, { getTweets })(CandidateWord)
