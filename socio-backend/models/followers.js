var mongoose = require('mongoose')

var followersSchema = new mongoose.Schema({
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

})


var Followers = mongoose.model('Followers', followersSchema)

module.exports = Followers;
