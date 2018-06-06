var express = require('express')
var router = express.Router()
var helpers = require('../helper/external')

router.route('/:handle/all/')
  .get(helpers.getAllTweets)

router.route('/info/:handle/')
  .get(helpers.getCandidate)


router.route('/:handle/:sinceId/latest')
  .get(helpers.getLatestTweets)

router.route('/:handle/:cursor/followers')
  .get(helpers.getFollowers)

router.route('/:handle/:maxId')
  .get(helpers.getTweets)

router.route('/:handle')
  .get(helpers.getTweets)





module.exports = router
