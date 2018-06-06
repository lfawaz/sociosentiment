import { GET_TWEETS_MOVING_AVG } from '../actions/index'

export default function(state={}, action){
  switch (action.type) {
    case GET_TWEETS_MOVING_AVG:
      return action.payload.data
    default:
      return state

  }
}
