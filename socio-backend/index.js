require('dotenv').config();

var Twitter = require('twitter')

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const params = {
                screen_name: 'realdonaldtrump',
                count:1,
                exclude_replies1: true }

client.get('statuses/user_timeline', params, function(error, tweets, response){
  console.log(tweets)
})
