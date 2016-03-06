import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { receiveBugs, localUpdateBug, updateFilter, updateSort, identify } from './actions'
import {status, priority } from '../bug-enums'

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

const people = createReducer({
  [identify]: (state, payload) => {
    return {...state, [payload]: 'pink'}
  }
}, {
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
    owner: 'Drew',
    reporter: 'Tyke',
    status: 'Backlog',
    createdAt: 1
  },
  '2': {
    _id: 2,
    description: 'Bug #2',
    priority: 'High',
    owner: 'Greg',
    reporter: 'Evan',
    status: 'Done',
    createdAt: 2
  },
  '3': {
    _id: 3,
    description: 'Bug #3',
    priority: 'Low',
    owner: 'Tyke',
    reporter: 'Greg',
    status: 'Code Review',
    createdAt: 4
  },
  '4': {
    _id: 4,
    description: 'Bug #4',
    priority: 'Highest',
    owner: 'Lauren',
    reporter: 'Tyke',
    status: 'In Progress',
    createdAt: 3
  },
  '5': {
    _id: 5,
    description: 'Bug #5',
    priority: 'Medium',
    owner: 'Drew',
    reporter: 'Lauren',
    status: 'Deployed',
    createdAt: 5
  },
  '6': {
    _id: 6,
    description: 'Bug #6',
    priority: 'Low',
    owner: 'Evan',
    reporter: 'Lauren',
    status: 'Will not fix',
    createdAt: 6
  }
})

const combinedReducers = combineReducers({
  bugs, people, rtUpdates, filters, sort, identity
})

export const rootReducer = function (state = {}, action) {
  return combinedReducers(state, action)
}
