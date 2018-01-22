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




exports.getTweets = function(req, res){
  const params = {
                 exclude_replies: true,
                 include_rts: false,
                 tweet_mode: 'extended'
               }

   const request = 'statuses/user_timeline'

   params.screen_name = req.params.handle
   params.count = 3200
   params.max_id = req.params.maxId

   const tweets = {}

   client.get(request, params,function(error,data,response){
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
      //res.send(tweets)
      function get_historical_tweets(previous_tweets,maxId){
        params.max_id = maxId
        client.get(request, params, function(error,data,response){

          new_data = data.map(tweet => ({
                                                "Id": tweet.id,
                                                "date": tweet.created_at,
                                                "tweet" : cleanString(tweet.full_text),
                                                "full_tweet" : tweet.full_text,
                                                "retweets": tweet.retweet_count,
                                                "favorites": tweet.favorite_count,
                                                "followers" : tweet.user.followers_count,
                                                "image" : tweet.user.profile_image_url

                                              }))
                if(new_data.length > 1)
                {

                  tweets[req.params.handle] = [...previous_tweets[req.params.handle],...new_data].slice(0,10000)
                  const maxId = tweets[req.params.handle].map(tweet=> tweet.Id).reduce((value, nextValue) => value > nextValue ? nextValue : value )
                  get_historical_tweets(tweets,maxId)
                  console.log(req.params.handle,maxId)

                } else{
                  console.log("sending")
                  tweets[req.params.handle] = tweets[req.params.handle].reverse()
                   res.send(tweets)
                }

        })

      }

      get_historical_tweets(tweets,maxId)

//end of get_historical_tweets



     })



}





exports.getAllTweets = function(req, res){
  const params = {
                 exclude_replies: true,
                 include_rts: false,
                 tweet_mode: 'extended'
               }

  const request = 'statuses/user_timeline'
  params.screen_name = req.params.handle
  params.count = 2
          client.get(request, params)
            .then(tweets => res.send(tweets[0]))
          }




module.exports = exports
