import { GET_TWEETS } from '../actions/index'


export default function(state=[], action){
  switch(action.type){
    case GET_TWEETS:
      return action.payload.data
    default:
      return state
  }

}
