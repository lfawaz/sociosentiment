var mongoose = require('mongoose')

var candidateSchema = new mongoose.Schema({
  id: Number,
  name: String,
  screen_name: String,
  tweets: [{
        id: Number,
        date: String,
        tweet: String,
        full_tweet: String,
        retweets: Number,
        favorites: Number,
        followers: Number,
        image: String
      }],
  followers_count: Number,
  friends_count: Number,
  location: String,
  profile_image_url: String,
  followers: [{
      id: String,
      name: String,
      screen_name: String,
      location: String,
      description: String,
      protected: Boolean,
      followers_count: Number,
      friends_count: Number,
      listed_count: Number,
      created_at: String,
      favourites_count: Number,
      geo_enabled: Boolean,
      verified: Boolean,
      statuses_count: Number,
      lang: String,
      profile_image_url: String,
      candidate_id: String
    }]
})

var candidates = mongoose.model('candidates', candidateSchema)

module.exports = candidates;
