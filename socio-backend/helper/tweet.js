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
  return sw.removeStopwords(string.toLowerCase().replace(/[^a-z\s]/g,'').split(' ').filter(word=> word !== "amp")).join(' ')
}

request = 'statuses/user_timeline'
const params = {
               exclude_replies: true,
               include_rts: false,
               tweet_mode: 'extended'
             }

exports.getTweets = function(req, res){
   params.screen_name = req.params.handle
   params.count = 3200
   params.max_id = req.params.maxId
     client.get(request, params)
       .then(data => {
         const tweets = {}


        tweets[req.params.handle] = data.map(tweet => ({
                                              "Id": tweet.id,
                                              "date": tweet.created_at,
                                              "tweet" : cleanString(tweet.full_text),
                                              "retweets": tweet.retweet_count,
                                              "favorites": tweet.favorite_count,
                                              "followers" : tweet.user.followers_count,
                                              "image" : tweet.user.profile_image_url

                                             })
                                           )

            res.send(tweets)
     })
}





exports.getAllTweets = function(req, res){
  params.screen_name = req.params.handle
  params.count = 2
          client.get(request, params)
            .then(tweets => res.send(tweets))
          }

module.exports = exports
