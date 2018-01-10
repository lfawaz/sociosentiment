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
  return sw.removeStopwords(string.toLowerCase().replace(/[^a-z\s]/g,'').replace(/\n/g,' ').split(' ').filter(word=> (word !== "amp" & !word.startsWith('http')))).join(' ')
}


const params = {
               exclude_replies: true,
               include_rts: false,
               tweet_mode: 'extended'
             }

exports.getTweets = function(req, res){
   const request = 'statuses/user_timeline'

   params.screen_name = req.params.handle
   params.count = 3200
   params.max_id = req.params.maxId
   let data = {}

  client.get(request, params,function(error,data,response){
       const tweets = {}
       tweets[req.params.handle] = data.map(tweet => ({
                                             "Id": tweet.id,
                                             "date": tweet.created_at,
                                             "tweet" : cleanString(tweet.full_text),
                                             "full_tweet" : tweet.full_text,
                                             "retweets": tweet.retweet_count,
                                             "favorites": tweet.favorite_count,
                                             "followers" : tweet.user.followers_count,
                                             "image" : tweet.user.profile_image_url

                                            })
                                          )
          const maxId = tweets[req.params.handle].map(tweet=> tweet.Id).reduce((value, nextValue) => value > nextValue ? nextValue : value )

           params.max_id = maxId
           console.log(params)

          client.get(request, params, function(error,data,response){

            tweets[req.params.handle] = [...tweets[req.params.handle],...data.map(tweet => ({
                                                  "Id": tweet.id,
                                                  "date": tweet.created_at,
                                                  "tweet" : cleanString(tweet.full_text),
                                                  "full_tweet" : tweet.full_text,
                                                  "retweets": tweet.retweet_count,
                                                  "favorites": tweet.favorite_count,
                                                  "followers" : tweet.user.followers_count,
                                                  "image" : tweet.user.profile_image_url

                                                 })
                                               )]
              res.send(tweets)
          })
     })



}





exports.getAllTweets = function(req, res){
  const request = 'statuses/user_timeline'
  params.screen_name = req.params.handle
  params.count = 2
          client.get(request, params)
            .then(tweets => res.send(tweets[0]))
          }


exports.getAllMentions = function(req, res){
  const request = 'statuses/mentions_timeline'
  params.screen_name = req.params.handle
  params.count = 2

          client.get(request, params)
            .then(tweets => res.send(tweets))
          }

module.exports = exports
