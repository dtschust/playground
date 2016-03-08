import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { receiveBugs, updateFilter, startRtUpdate,
        stopRtUpdate, addPerson, removePerson, initPeople,
        focusOnBug, clearFocus, loadProjectName,
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

const focus = createReducer({
  [focusOnBug]: (state, payload) => {
    return payload
  },
  [clearFocus]: (state, payload) => {
    return null
  }
}, null)

const filterDefaults = {
  _id: undefined,
  priority: undefined,
  owner: undefined,
  description: undefined,
  status: undefined
}
const filters = createReducer({
  [updateFilter]: (state, payload) => {
    return {...state, ...payload}
  }
}, filterDefaults)

const sortDefaults = {
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
}

const sort = createReducer({
  [updateSort]: (state, payload) => {
    return {...state, ...payload}
  }
}, sortDefaults)

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
    var newPeople = [...state]
    newPeople[0] = payload
    return newPeople
  },
  [addPerson]: (state, payload) => {
    var newPeople = [...state]
    if (newPeople.indexOf(payload) < 0) {
      newPeople.push(payload)
      return newPeople
    }
    return state
  },
  [removePerson]: (state, payload) => {
    var newPeople = [...state]
    if (newPeople.indexOf(payload) >= 0) {
      newPeople.splice(newPeople.indexOf(payload), 1)
    }
    return newPeople
  },
  [initPeople]: (state, payload) => {
    var newPeople = [...state]
    payload.forEach((person) => {
      if (newPeople.indexOf(person) < 0) {
        newPeople.push(person)
      }
    })

    // Remove people that have disconnected
    newPeople.forEach((person, i) => {
      if (payload.indexOf(person) < 0 && i !== 0) {
        newPeople.splice(i, 1)
      }
    })
    return newPeople
  }
},
[undefined]
)
const projectName = createReducer({
  [loadProjectName]: (state, payload) => {
    return payload
  }
}, null)

const bugs = createReducer({
  [receiveBugs]: (state, payload) => {
    var newBugs = payload.reduce(function (prev, curr) {
      prev[curr._id] = curr
      return prev
    }, {})
    return {...state, ...newBugs}
  }
}, {
})

const combinedReducers = combineReducers({
  bugs, people, rtUpdates, filters, sort, identity, localEdits, focus, projectName
})

export const rootReducer = function (state = {}, action) {
  return combinedReducers(state, action)
}
