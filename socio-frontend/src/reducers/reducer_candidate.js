import { GET_CANDIDATE } from '../actions/index'


export default function(state={}, action){
  switch(action.type){
    case GET_CANDIDATE:
      const key = action.payload.data.screen_name
      //The commands below do the same thing
      //return {...state, [key]: action.payload.data}
      return Object.assign({}, state, {
        [key]: action.payload.data
      })


    default:
      return state
  }

}
