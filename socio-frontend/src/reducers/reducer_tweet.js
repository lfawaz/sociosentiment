import { GET_TWEETS } from '../actions/index'


export default function(state={}, action){
  switch(action.type){
    case GET_TWEETS:

      const key = Object.keys(action.payload.data)[0]
      if(state[key] === undefined){
        return { ...state,[key]: action.payload.data[key]}
      }
      else{
        const oldState = state
        //oldState[key] = [...oldState[key],...action.payload.data[key]]
        oldState[key] = [...action.payload.data[key]]
        return {...oldState}
      }

    default:
      return state
  }

}
