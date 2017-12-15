import axios from 'axios'
const ROOT_URL = '/api/tweets'

export const GET_TWEETS = 'GET_TWEETS'

export function getTweets(handle,minId){
  let idPath = ''
  console.log(minId)

  if(minId !== undefined){
      idPath = `/${minId.minId}`
  }
  const URL = `${ROOT_URL}/${handle}${idPath}`

  const request = axios.get(URL)
  console.log(`fired API call for ${handle}`)
  return{
    type: GET_TWEETS,
    payload: request
  }

}
