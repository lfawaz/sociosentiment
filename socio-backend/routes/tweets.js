var express = require('express')
var router = express.Router()
var helpers = require('../helper/tweet')

router.route('/')
  .get(helpers.getTweets)


  router.route('/all')
    .get(helpers.getAllTweets)

module.exports = router
