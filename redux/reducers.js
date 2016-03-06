import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { receiveBugs, localUpdateBug, updateFilter } from './actions'

const rtUpdates = createReducer({
  [localUpdateBug]: (state, payload) => {
    var rtUpdate = state[payload['_id']]
    var updates = {}
    Object.keys(payload.updates).forEach((key) => {
      updates[key] = payload.person
    })
    var newUpdates = {...rtUpdate, ...updates}
    return { ...state, [payload['_id']]: newUpdates }
  }
}, {})

const filters = createReducer({
  [updateFilter]: (state, payload) => {
    return {...state, ...payload}
  }
}, {
  _id: undefined,
  priority: undefined,
  owner: undefined,
  description: undefined
})

const people = createReducer({
}, {
  Drew: 'pink',
  Greg: 'red',
  Evan: 'green',
  Tyke: 'orange',
  Lauren: 'purple'
})

const bugs = createReducer({
  [receiveBugs]: (state, payload) => {
    var newBugs = payload.reduce(function (prev, curr) {
      prev[curr._id] = curr
      return prev
    }, {})
    return {...state, ...newBugs}
  },
  [localUpdateBug]: (state, payload) => {
    var bug = {...state[payload['_id']], ...payload.updates}
    // bug[payload.key] = payload.value
    return {...state, [bug['_id']]: bug}
  }
}, {
  '1': {
    _id: 1,
    description: 'Bug #1',
    priority: 'Medium',
    owner: 'Drew'
  },
  '2': {
    _id: 2,
    description: 'Bug #2',
    priority: 'Medium',
    owner: 'Drew'
  },
  '3': {
    _id: 3,
    description: 'Bug #3',
    priority: 'Medium',
    owner: 'Drew'
  },
  '4': {
    _id: 4,
    description: 'Bug #4',
    priority: 'Medium',
    owner: 'Drew'
  },
  '5': {
    _id: 5,
    description: 'Bug #5',
    priority: 'Medium',
    owner: 'Drew'
  },
  '6': {
    _id: 6,
    description: 'Bug #6',
    priority: 'Medium',
    owner: 'Drew'
  }
})

const combinedReducers = combineReducers({
  bugs, people, rtUpdates, filters
})

export const rootReducer = function (state = {}, action) {
  return combinedReducers(state, action)
}
