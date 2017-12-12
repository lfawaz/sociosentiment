import axios from 'axios'
const ROOT_URL = '/api/tweets'

export const GET_TWEETS = 'GET_TWEETS'

export function getTweets(handle){
  const URL = `${ROOT_URL}/${handle}`
  const request = axios.get(URL)
  console.log(request)
  return{
    type: GET_TWEETS,
    payload: request
  }

}
