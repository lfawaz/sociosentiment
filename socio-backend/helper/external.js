require('dotenv').config({path: '../.env'});
sw = require('stopword')

var Twitter = require('twitter')

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})


function cleanString(string){
  return sw.removeStopwords(string.toLowerCase()
    .replace(/[^a-z\s]/g,'')
    .replace(/\n/g,' ')
    .split(' ')
    .filter(word=> (word !== "amp" & !word.startsWith('http'))))
    .join(' ')
}

function fetchTweet(tweet){
  return {
    "id": tweet.id,
    "date": tweet.created_at,
    "tweet" : cleanString(tweet.full_text),
    "full_tweet" : tweet.full_text,
    "retweets": tweet.retweet_count,
    "favorites": tweet.favorite_count,
    "followers" : tweet.user.followers_count,
    "image" : tweet.user.profile_image_url
    }
}

exports.getLatestTweets = function(req, res){

  const request = 'statuses/user_timeline'

  const params = {
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended'
    }

  params.screen_name = req.params.handle
  params.count = 3200
  params.since_id = req.params.sinceId

  const tweets = {}

  client.get(request, params).then(function(data){
    tweets[req.params.handle] = data.map(tweet => (fetchTweet(tweet)))
    res.send(tweets)
  }).catch(err => console.log(err))


}

exports.getTweets = function(req, res){

  const request = 'statuses/user_timeline'

  const params = {
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended'
    }

  params.screen_name = req.params.handle
  params.count = 3200
  params.max_id = req.params.maxId





  const tweets = {}

  //Get Tweets for a handle
  client.get(request, params).then(function(data){
    tweets[req.params.handle] = data.map(tweet => (fetchTweet(tweet)))

    const maxId = tweets[req.params.handle]
      .map(tweet => tweet.id)
      .reduce((value, nextValue) => value > nextValue ? nextValue : value )

    //Recursively Get Historical Tweets
    function get_historical_tweets(previous_tweets,maxId){
      params.max_id = maxId

    client.get(request, params).then(function(data){
      new_data = data.map(tweet => (fetchTweet(tweet)))
      if(new_data.length > 1){

        tweets[req.params.handle] = [...previous_tweets[req.params.handle],...new_data].slice(0,10000)

        const maxId = tweets[req.params.handle]
          .map(tweet=> tweet.id)
          .reduce((value, nextValue) => value > nextValue ? nextValue : value )

        get_historical_tweets(tweets,maxId)

        }else{
          tweets[req.params.handle] = tweets[req.params.handle].reverse()
          res.send(tweets)
          }
    }).catch(err => console.log(err))
  }
    get_historical_tweets(tweets,maxId)
}).catch(err => console.log(err))
}
//end of Get Tweets

exports.getAllTweets = function(req, res){

  const request = 'statuses/user_timeline'

  const params = {
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended'
    }


  params.screen_name = req.params.handle
  params.count = 2

  client.get(request, params)
    .then(tweets => res.send(tweets[0]))
    .catch(err => console.log(err))
  }

exports.getFollowers = function(req, res){

  const request = 'followers/list'

  const params = {
    cursor: req.params.cursor
    }



  params.screen_name = req.params.handle
  params.count = 200

  client.get(request, params)
    .then(followers => res.send(followers))
    .catch(err => console.log(err))
    }


exports.getCandidate = function(req, res){

     const request = "users/lookup"

     const screen_name = req.params.handle
     const params = { screen_name }

     client.get(request, params)
       .then(candidate => res.send(candidate))
       .catch(err => console.log(err))


  }

module.exports = exports
