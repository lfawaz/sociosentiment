import { combineReducers } from 'redux'
import tweetReducer from './reducer_tweet'

const rootReducer = combineReducers({
  tweetsAll: tweetReducer

})

export default rootReducer;
