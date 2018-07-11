var express = require('express')
var router = express.Router()
var helpers = require('../helper/internal')


router.route('/info/:handle/')
  .get(helpers.getCandidateInfo)
  .post(helpers.postCandidateInfo)
  .put(helpers.putCandidateInfo)

  router.route('/:handle/')
    .get(helpers.getCandidateTweets)
    .post(helpers.postCandidateTweets)

router.route('/followers/:handle/')
  .get(helpers.getCandidateFollowers)
  .post(helpers.postCandidateFollowers)

router.route('/bymonth/:handle')
  .get(helpers.getCandidateTweetsByMonth)

router.route('/movingaverage/:handle')
  .get(helpers.getCandidateTweetsMovingAverage)

router.route('/toptweets/:handle/:topx')
  .get(helpers.getTopXTweets)

router.route('/topwords/:handle/:topx')
  .get(helpers.getTopXWords)


module.exports = router
