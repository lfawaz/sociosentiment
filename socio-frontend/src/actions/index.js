import axios from 'axios'
const ROOT_DB_URL = '/db/tweets'
const ROOT_API_URL = '/api/tweets'

export const GET_TWEETS = 'GET_TWEETS'
export const GET_CANDIDATE = 'GET_CANDIDATE'
export const REFRESH_CANDIDATE = 'REFRESH_CANDIDATE'
export const POST_CANDIDATE = 'POST_CANDIDATE'
export const GET_TWEETS_BY_MONTH = 'GET_TWEETS_BY_MONTH'
export const GET_TWEETS_MOVING_AVG = 'GET_TWEETS_MOVING_AVG'
export const GET_TOPX_TWEETS = 'GET_TOPX_TWEETS'
export const GET_TOPX_WORDS = 'GET_TOPX_WORDS'

export function getCandidate(handle){

  const URL = `${ROOT_DB_URL}/info/${handle}`

  const request = axios.get(URL)

  return{
    type: GET_CANDIDATE,
    payload: request
  }

}

export function refreshCandidate(screen_name, sinceId, withFollowers=0){

  const API_GET_CANDIDATE_URL = `${ROOT_API_URL}/info/${screen_name}/`
  const DB_POST_CANDIDATE_URL = `${ROOT_DB_URL}/info/${screen_name}/`
  const request = axios.get(API_GET_CANDIDATE_URL).then(response => {
    axios.put(DB_POST_CANDIDATE_URL, response.data[0])


    const API_GET_LATEST_TWEETS_URL = `${ROOT_API_URL}/${screen_name}/${sinceId}/latest`
    const DB_POST_TWEETS_URL = `${ROOT_DB_URL}/${screen_name}`

    axios.get(API_GET_LATEST_TWEETS_URL)
      .then(allTweets => {

        const tweets = allTweets.data[screen_name].filter(tweet => tweet.id !== sinceId)
        tweets.forEach(tweet => axios.post(DB_POST_TWEETS_URL, tweet))
  })
  .catch(err => console.log(err))

if(withFollowers===1){

  const API_GET_FOLLOWERS_URL = `${ROOT_API_URL}/${screen_name}/-1/followers`
  const DB_POST_FOLLOWER_URL = `${ROOT_DB_URL}/followers/${screen_name}`

  axios.get(API_GET_FOLLOWERS_URL)
    .then(sampleFollowers => {

      const followers = sampleFollowers.data['users']
      followers.forEach(follower => axios.post(DB_POST_FOLLOWER_URL, follower))
})
.catch(err => console.log(err))

}


})
.catch(err => console.log(err))

  return{
    type: REFRESH_CANDIDATE,
    payload: request
  }

}

export function postCandidate(screen_name){

  const API_GET_CANDIDATE_URL = `${ROOT_API_URL}/info/${screen_name}/`
  const DB_POST_CANDIDATE_URL = `${ROOT_DB_URL}/info/${screen_name}/`

  const request = axios.get(API_GET_CANDIDATE_URL).then(response => {
    axios.post(DB_POST_CANDIDATE_URL, response.data[0])
      .then(response => {

        const API_GET_TWEETS_URL = `${ROOT_API_URL}/${screen_name}`
        const DB_POST_TWEETS_URL = `${ROOT_DB_URL}/tweets/${screen_name}`

        axios.get(API_GET_TWEETS_URL)
          .then(alltweets => {
            const tweets = alltweets.data[screen_name]
            tweets.forEach(tweet => axios.post(DB_POST_TWEETS_URL, tweet))
      })
  })
})
  return{
    type: POST_CANDIDATE,
    payload: request
  }

}

export function getCandidateTweetsByMonth(screen_name){

  const URL = `${ROOT_DB_URL}/bymonth/${screen_name}`

  const request = axios.get(URL)

  return{
    type: GET_TWEETS_BY_MONTH,
    payload: request
  }

}

export function getCandidateTweetsMovingAverage(screen_name){
  const URL = `${ROOT_DB_URL}/movingaverage/${screen_name}`

  const request = axios.get(URL)

  return{
    type: GET_TWEETS_MOVING_AVG,
    payload: request
  }
}

export function getTopXTweets(screen_name, topx){
  const URL = `${ROOT_DB_URL}/toptweets/${screen_name}/${topx}`

  const request = axios.get(URL)

  return {
    type: GET_TOPX_TWEETS,
    payload: request
  }
}

export function getTopXWords(screen_name, topx){
  const URL = `${ROOT_DB_URL}/topwords/${screen_name}/${topx}`

  const request = axios.get(URL)

  return {
    type: GET_TOPX_WORDS,
    payload: request
  }
}
