var mongoose = require("mongoose")
mongoose.set('debug', true)

mongoose.connect('mongodb://localhost/sociosentiment')

mongoose.Promise = Promise

module.exports.Followers = require('./followers')

module.exports.candidates = require('./candidates')
