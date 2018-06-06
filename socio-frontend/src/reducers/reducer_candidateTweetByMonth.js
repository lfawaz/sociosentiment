import { GET_TWEETS_BY_MONTH } from '../actions/index'

export default function(state={}, action){
  switch (action.type) {
    case GET_TWEETS_BY_MONTH:
      return action.payload.data
    default:
      return state

  }
}
