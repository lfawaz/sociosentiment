import { GET_TOPX_WORDS } from '../actions/index'

export default function(state={}, action){
  switch (action.type) {
    case GET_TOPX_WORDS:
      return action.payload.data
    default:
      return state

  }
}
