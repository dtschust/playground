/* global fetch */
import { createAction } from 'redux-act'
import 'whatwg-fetch'

export const receiveBugs = createAction('receive any amount of bugs')

// export const localUpdateBug = createAction('Update the state of a bug')

export const updateFilter = createAction('Update an individual filter')

export const updateSort = createAction('Change the sort key')

export const identify = createAction('Store the user\'s name')

export const startEditing = createAction('Begin to edit a field')

export const endEditing = createAction('Stop editing a field')

export const startRtUpdate = createAction('Start animating a rt update')

export const stopRtUpdate = createAction('Stop animating a rt update')

export const rtUpdate = function (payload) {
  return dispatch => {
    dispatch(startRtUpdate(payload))
    setTimeout(() => {
      dispatch(stopRtUpdate(payload))
    }, 500)
  }
}

export const fetchBugs = function () {
  return dispatch => {
    fetch('/api/bugs/' + window.projectName.toLowerCase())
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        dispatch(receiveBugs(json))
      }).catch(function (error) {
        console.log('json parsing failed', error)
      })
  }
}

export const updateBug = function (bug) {
  return (dispatch, getState) => {
    var id = bug._id
    bug.person = getState().identity
    return fetch('/api/bugs/' + id, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bug)
    }).then(function (response) {
      return response.json()
    }).then(function (json) {
      dispatch(receiveBugs(json))
    }).catch(function (error) {
      console.log('json parsing failed', error)
    })
  }
}

// export const deleteBug = function (bugId) {
//   return dispatch => {
//
//   }
// }
//
export const createBug = function (bug) {
  return dispatch => {
    return fetch('/api/bugs', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bug)
    }).then(function (response) {
      return response.json()
    }).then(function (json) {
      dispatch(receiveBugs(json))
    }).catch(function (error) {
      console.log('json parsing failed', error)
    })
  }
}
