import { combineReducers } from 'redux'
import candidateReducer from './reducer_candidate'
import candidateListReducer from './reducer_candidateList'
import candidateTweetsByMonthReducer from './reducer_candidateTweetByMonth'
import candidateTweetsMovingAvgReducer from './reducer_candidateTweetMovingAvg'
import candidateTopXTweets from './reducer_candidateTopXTweets'
import candidateTopXWords from './reducer_candidateTopXWords'

const rootReducer = combineReducers({
  candidate: candidateReducer,
  candidateList: candidateListReducer,
  tweetsByMonth: candidateTweetsByMonthReducer,
  tweetsMovingAvg: candidateTweetsMovingAvgReducer,
  topxtweets: candidateTopXTweets,
  topxwords: candidateTopXWords

})

export default rootReducer;
