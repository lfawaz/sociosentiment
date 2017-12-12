import { combineReducers } from 'redux'
import tweetReducer from './reducer_tweet'

const rootReducer = combineReducers({
  tweets: tweetReducer

})

export default rootReducer;
