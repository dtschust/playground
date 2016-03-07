import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { receiveBugs, updateFilter, startRtUpdate,
        stopRtUpdate,
        updateSort, identify, startEditing, endEditing } from './actions'
import {status, priority} from '../bug-enums'

const rtUpdates = createReducer({
  [startRtUpdate]: (state, payload) => {
    return {...state, [payload.rtUpdateKey]: payload.person || true}
  },
  [stopRtUpdate]: (state, payload) => {
    return { ...state, [payload.rtUpdateKey]: false }
  }
}, {
})

const filters = createReducer({
  [updateFilter]: (state, payload) => {
    return {...state, ...payload}
  }
}, {
  _id: undefined,
  priority: undefined,
  owner: undefined,
  description: undefined,
  status: undefined
})

const sort = createReducer({
  [updateSort]: (state, payload) => {
    return {...state, ...payload}
  }
}, {
  sortBy: 'createdAt',
  direction: 'asc',
  sortOptions: {
    createdAt: {
      displayName: 'Created At',
      defaultDirection: 'asc'
    },
    updatedAt: {
      displayName: 'Updated At',
      defaultDirection: 'asc'
    },
    priority: {
      displayName: 'Priority',
      customSort: priority.enum.reverse(),
      defaultDirection: 'desc'
    },
    owner: {
      displayName: 'Owner',
      defaultDirection: 'asc'
    },
    reporter: {
      displayName: 'Reporter',
      defaultDirection: 'asc'
    },
    status: {
      displayName: 'Status',
      customSort: status.enum.reverse(),
      defaultDirection: 'asc'
    }
  }
})

const identity = createReducer({
  [identify]: (state, payload) => {
    return payload
  }
}, '')

const localEdits = createReducer({
  [startEditing]: (state, payload) => {
    return payload
  },
  [endEditing]: (state, payload) => {
    return {id: undefined, field: undefined}
  }
}, {
  id: undefined,
  field: undefined
})

const people = createReducer({
  [identify]: (state, payload) => {
    return {...state, [payload]: 'pink'}
  }
}, {
})

const bugs = createReducer({
  [receiveBugs]: (state, payload) => {
    var newBugs = payload.reduce(function (prev, curr) {
      prev[curr._id] = curr
      return prev
    }, {})
    return {...state, ...newBugs}
  }/*,
  [localUpdateBug]: (state, payload) => {
    var bug = {...state[payload['_id']], ...payload.updates}
    // bug[payload.key] = payload.value
    return {...state, [bug['_id']]: bug}
  }*/
}, {
})

const combinedReducers = combineReducers({
  bugs, people, rtUpdates, filters, sort, identity, localEdits
})

export const rootReducer = function (state = {}, action) {
  return combinedReducers(state, action)
}
