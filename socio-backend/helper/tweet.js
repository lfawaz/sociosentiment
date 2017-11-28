require('dotenv').config({path: '../.env'});

var Twitter = require('twitter')

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const params = {
                screen_name: 'realdonaldtrump',
                count:10,
                exclude_replies: true,
                include_rts: false,
                tweet_mode: 'extended'
              }


request = 'statuses/user_timeline'

exports.getTweets = function(req, res){

     client.get(request, params)
       .then(tweets => res.send(tweets.map(tweet => ({
         "date": tweet.created_at,
         "tweet" : tweet.full_text,
         "truncated" : tweet.truncated,
        "retweets": tweet.retweet_count,
        "favorites": tweet.favorite_count,
        "followers" : tweet.user.followers_count

       }))))
     }


exports.getAllTweets = function(req, res){

          client.get(request, params)
            .then(tweets => res.send(tweets))
          }

module.exports = exports
