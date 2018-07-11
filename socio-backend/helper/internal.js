var db = require("../models")

exports.insertFollowers = function(user){
  db.Followers.create(user)
}

exports.insertCandidate = function(candidate){
  db.candidates.create(candidate)
}

exports.insertCandidateTweets = function(screen_name, tweets){

  db.candidates.findOneAndUpdate(
    { screen_name: screen_name },
    { $push: { tweets: { $each:  tweets } } },
    { new: true},
    function(err, doc){
      if(err){
        console.log("Somethign went wrong the data doesn't happen")
      }
      //console.log(doc)
    }
  )
}

exports.findCandidate = function(handle){
  return db.candidates.findOne({"screen_name": handle})
}

exports.getCandidateInfo = function(req, res){
  const {handle} = req.params

  db.candidates.findOne({"screen_name": handle})
    .then(candidate => {

      const candidateInfo = {
        screen_name: candidate.screen_name,
        name: candidate.name,
        location: candidate.location,
        followers_count: candidate.followers_count,
        friends_count: candidate.friends_count,
        profile_image_url: candidate.profile_image_url,
        tweets: candidate.tweets
      }
      res.json(candidateInfo)
    })
    .catch(err => res.send(err))
}

exports.getCandidateTweets = function(req, res){
  const {handle} = req.params

  db.candidates.findOne({"screen_name": handle})
    .then(candidate => {

      const candidateTweets = candidate.tweets
      res.json(candidateTweets)
    })
    .catch(err => res.send(err))
}

exports.postCandidateInfo = function(req, res){
  db.candidates.create(req.body)
    .then(candidate => res.json(candidate))
    .catch(err => res.send(err))
}

exports.putCandidateInfo = function(req, res){
  db.candidates.findOneAndUpdate({screen_name: req.params.handle}, req.body, {new: true})
    .then(candidate => res.json(candidate))
    .catch(err => res.send(err))

}

exports.postCandidateTweets = function(req, res){


  db.candidates.findOneAndUpdate(
    { screen_name: req.params.handle },
    { $push: { tweets: req.body } },
    { new: true})
    .then(tweets => res.json(tweets))
    .catch(err => res.send(err))

}

exports.getCandidateFollowers = function(req, res){

  const {handle} = req.params

  db.candidates.findOne({"screen_name": handle})
    .then(candidate => {

      const candidateFollowers = candidate.followers
      res.json(candidateFollowers)

    }).catch(err => res.send(err))
}

exports.postCandidateFollowers = function(req, res){


  db.candidates.findOneAndUpdate(
    { screen_name: req.params.handle },
    { $push: { followers: req.body } },
    { new: true})
    .then(followers => res.json(followers))
    .catch(err => res.send(err))

}

exports.getCandidateTweetsByMonth = function(req, res){
  const {handle} = req.params

  db.candidates.findOne({"screen_name": handle})
    .then(candidate => {
      const today = new Date()
      const lastYear = new Date(today).setDate(today.getDate() - 100 )


      const candidateTweets = candidate.tweets.filter(tweet => new Date(tweet.date).getFullYear() >= 2017)
                                              .sort(dateSort)

      console.log(candidate.tweets)
      const tweetsByMonth = candidateTweets.map(tweet => {

          return {
                   monthYear: new Date(tweet.date).getFullYear() + '-' + (new Date(tweet.date).getMonth() + 1),
                   likes: tweet.favorites,
                   retweets: tweet.retweets
          }
      }).reduce(function(accu, nextValue){

        const { monthYear, likes, retweets } = nextValue

        if(accu[monthYear] == undefined){
          accu[monthYear] = { likes: likes, retweets: retweets, count: 1 }

        }else{
          accu[monthYear].likes += likes
          accu[monthYear].retweets += retweets
          accu[monthYear].count += 1
        }

        return accu

      },{})

      //const likesByMonth = Object.values(tweetsByMonth)

      res.json(tweetsByMonth)
    })
    .catch(err => res.send(err))
}

exports.getCandidateTweetsMovingAverage = function(req, res){

  const {handle} = req.params

  db.candidates.findOne({"screen_name": handle})
    .then(candidate => {

      const today = new Date()
      const lastYear = new Date(today).setDate(today.getDate() - 100 )


      const candidateTweets = candidate.tweets.filter(tweet => new Date(tweet.date).getFullYear() >= 2017)
                                              .sort(dateSort)


      const tweetsByDay = candidateTweets.map(tweet => {

          const day = new Date(tweet.date).getDate()
          const month = new Date(tweet.date).getMonth()
          const year = new Date(tweet.date).getFullYear()

          return {
                   date:  new Date(year, month, day),
                   likes: tweet.favorites,
                   retweets: tweet.retweets
          }
      }).reduce(function(accu, nextValue){

        const { date, likes, retweets } = nextValue

        if(accu[date] == undefined){
          accu[date] = { likes: likes, retweets: retweets, count: 1 }

        }else{
          accu[date].likes += likes
          accu[date].retweets += retweets
          accu[date].count += 1
        }

        return accu

      },{})

      //const likesByMonth = Object.values(tweetsByMonth)
      const likesMovingAverage = calculateMovingAverage(Object.values(tweetsByDay).map(tweet => tweet.likes/tweet.count))
      const retweetsMovingAverage = calculateMovingAverage(Object.values(tweetsByDay).map(tweet => tweet.retweets/tweet.count))
      const movingAverages = { days: Object.keys(tweetsByDay), likesMovingAverage: likesMovingAverage, retweetsMovingAverage: retweetsMovingAverage }
      res.json(movingAverages)
    })
    .catch(err => res.send(err))
}

exports.getTopXTweets = function (req, res){

  const { handle, topx } = req.params

  db.candidates.findOne({ "screen_name": handle}).then( candidate => {
    const topTweets = candidate.tweets.map(tweet => {return { text: tweet.full_tweet, likes: tweet.favorites }})
                                        .sort(function(a,b){
                                          if (a.likes > b.likes){
                                            return -1
                                          } else {
                                            return 1
                                          }
                                        })
                                          .slice(0,topx)

            res.json(topTweets)
  }).catch(err => res.send(err))
}

 function calculateMovingAverage(data, period=60){

   return data.map((value, index) => {

     const endingIndex = index + 1
     if(index < period){
       const accu = data.slice(0,endingIndex).reduce((accu, value) => accu + value)

       return accu/endingIndex
     }else{
       const startingIndex = index - period
       const accu = data.slice(startingIndex,endingIndex).reduce((accu, value) => accu + value)

       return accu/period
     }

   })

 }

 exports.getTopXWords = function (req, res){
   const { handle, topx } = req.params

   db.candidates.findOne({ "screen_name": handle})
    .then( candidate => {
      const { tweets } = candidate

      const topxwords = wordSummary(tweets).filter(tweet => tweet.text != "").sort((a,b) => {
        return b.count - a.count
      })

      res.json(topxwords.slice(0,topx))

    })
 }


function dateSort(a, b){
  var date1 = new Date(a.date)
  var date2 = new Date(b.date)

  if (date1 < date2){
    return -1
  }if (date1 > date2){
    return 1
  }else{
    return 0
  }

}


function mapWordToMeasure(tweetWord){
  return tweetWord.words.map(word => ({
    text: word,
    favorites: tweetWord.favorites,
    retweets: tweetWord.retweets,
    count: 1
}))
}

function wordSummary(tweets){
  //Generate a list of words
  const tweetWords = [].concat(...tweets.map(tweet => ({
      words: tweet.tweet.split(' '),
      favorites: tweet.favorites,
      retweets: tweet.retweets
    }) ))

  return [].concat([],...tweetWords.map(tweetWord => mapWordToMeasure(tweetWord))).reduce((accu, nextValue) => {

    if(accu.filter((obj) => obj.text === nextValue.text).length === 0){
      accu.push(nextValue)
    }else{
      for (var i = 0; i < accu.length; i++) {
        if(accu[i].text === nextValue.text){
          accu[i].count += nextValue.count
          accu[i].favorites += nextValue.favorites
          accu[i].retweets += nextValue.retweets
        }
      }
    }
    return accu
  },[]).filter(word => word.count > 1)

}

module.exports = exports
