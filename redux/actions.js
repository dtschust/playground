/* global fetch */
import { createAction } from 'redux-act'
import 'whatwg-fetch'

export const receiveBugs = createAction('receive any amount of bugs')

export const localUpdateBug = createAction('Update the state of a bug')

export const updateFilter = createAction('Update an individual filter')

export const fetchBugs = function () {
  return dispatch => {
    fetch('/api/bugs')
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
  return dispatch => {
    var id = bug._id
    fetch('/api/bugs/' + id, {
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

// export const deleteBug = function (bugId) {
//   return dispatch => {
//
//   }
// }
//
export const createBug = function (bug) {
  return dispatch => {
    fetch('/api/bugs', {
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
