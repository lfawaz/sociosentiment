var express = require('express')
var router = express.Router()
var helpers = require('../helper/tweet')

router.route('/:handle')
  .get(helpers.getTweets)


router.route('/all/:handle')
    .get(helpers.getAllTweets)

module.exports = router
