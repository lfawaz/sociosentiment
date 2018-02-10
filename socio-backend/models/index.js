var mongoose = require("mongoose")
mongoose.set('debug', true)

mongoose.connect('mongodb://localhost/followers')

mongoose.Promise = Promise

module.exports.followers = require('./followers')
