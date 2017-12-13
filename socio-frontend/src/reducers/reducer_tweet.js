import { GET_TWEETS } from '../actions/index'


export default function(state={}, action){
  switch(action.type){
    case GET_TWEETS:
      const key = Object.keys(action.payload.data)[0]
      return { ...state,[key]: action.payload.data[key]}
    default:
      return state
  }

}
