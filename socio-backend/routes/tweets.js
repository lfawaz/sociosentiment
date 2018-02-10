var express = require('express')
var router = express.Router()
var helpers = require('../helper/tweet')



router.route('/:handle/all/')
     .get(helpers.getAllTweets)
     
router.route('/:handle/:cursor/followers')
       .get(helpers.getFollowers)

router.route('/:handle/:maxId')
   .get(helpers.getTweets)

router.route('/:handle')
   .get(helpers.getTweets)





module.exports = router
