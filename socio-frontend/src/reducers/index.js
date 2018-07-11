import { combineReducers } from 'redux'
import candidateReducer from './reducer_candidate'
import candidateListReducer from './reducer_candidateList'
import candidateTweetsByMonthReducer from './reducer_candidateTweetByMonth'
import candidateTweetsMovingAvgReducer from './reducer_candidateTweetMovingAvg'
import candidateTopXTweets from './reducer_candidateTopXTweets'
import candidateTopXWords from './reducer_candidateTopXWords'
import senateCandidateListReducer from './reducer_senateCandidateList'
import governorCandidateListReducer from './reducer_governorCandidateList'
import houseCandidateListReducer from './reducer_houseCandidateList'

const rootReducer = combineReducers({
  candidate: candidateReducer,
  candidateList: candidateListReducer,
  tweetsByMonth: candidateTweetsByMonthReducer,
  tweetsMovingAvg: candidateTweetsMovingAvgReducer,
  topxtweets: candidateTopXTweets,
  topxwords: candidateTopXWords,
  senateCandidateList: senateCandidateListReducer,
  governorCandidateList: governorCandidateListReducer,
  houseCandidateList: houseCandidateListReducer

})

export default rootReducer;
