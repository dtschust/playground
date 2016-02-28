import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { receiveBugs } from './actions'

const bugs = createReducer({
  [receiveBugs]: (state, payload) => {
    var newBugs = payload.reduce(function (prev, curr) {
      prev[curr._id] = curr
      return prev
    }, {})
    return {...state, ...newBugs}
  }
}, {})

const combinedReducers = combineReducers({
  bugs
})

export const rootReducer = function (state = {}, action) {
  return combinedReducers(state, action)
}
