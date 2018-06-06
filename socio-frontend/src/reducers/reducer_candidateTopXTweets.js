import { GET_TOPX_TWEETS } from '../actions/index'

export default function(state={}, action){
  switch (action.type) {
    case GET_TOPX_TWEETS:
      return action.payload.data
    default:
      return state

  }
}
