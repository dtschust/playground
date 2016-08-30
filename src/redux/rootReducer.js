import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { routerReducer } from 'react-router-redux'
import * as Actions from './actions'

const fakeReducer = createReducer({
  [Actions.fakeAction]: (state, payload) => {
    return { ...state }
  },
  [Actions.loginSuccess]: (state, payload) => {
    return { user: payload }
  },
  [Actions.loginFail]: (state, payload) => {
    return { error: payload }
  }
}, {})

const rootReducer = combineReducers({
  fakeReducer,
  routing: routerReducer
})

export default rootReducer
