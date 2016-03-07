/* global io */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { updateFilter, identify, receiveBugs, fetchBugs, rtUpdate, addPerson, removePerson, fetchPeople } from './redux/actions.js'
import configureStore from './redux/configureStore'
import DrewView from './components/drew-view'

require('./styles/index.less')

var store = configureStore()
if (window.bugId) {
  store.dispatch(updateFilter({ _id: window.bugId }))
}
if (window.initialBugs) {
  store.dispatch(receiveBugs(window.initialBugs))
}
// var people = store.getState().people

var person = window.localStorage.getItem('person')
while (!person) {
  person = window.prompt('Please enter your name')
  window.localStorage.setItem('person', person)
}
store.dispatch(identify(person))
store.dispatch(fetchPeople())
// Fetch bugs every minute
setInterval(function () {
  store.dispatch(fetchBugs())
  store.dispatch(fetchPeople())
}, 60000)

// Person randomly updating bugs
// setInterval(function updateBugs () {
//   if (window.stopUpdates) {
//     return
//   }
//   var id = Math.ceil(Math.random() * 6)
//   var keyToChange = Math.floor(Math.random() * 4)
//   var updates
//   switch (keyToChange) {
//     case 0:
//       var priorityOptions = ['Low', 'Medium', 'High', 'Highest']
//       var priority = priorityOptions[Math.floor(Math.random() * 3)]
//       updates = { priority }
//       break
//     case 1:
//       updates = { description: 'Description ' + Math.random() }
//       break
//     case 2:
//       updates = { owner: Object.keys(people)[Math.floor(Math.random() * 5)] }
//       break
//     default:
//       updates = {}
//   }
//   var person = Object.keys(people)[Math.floor(Math.random() * 5)]
//   console.log(person)
//   store.dispatch(localUpdateBug({
//     '_id': id,
//     updates,
//     person
//   }))
// }, 500)

var socket = io()

var projectName = window.projectName.toLowerCase()
socket.emit('newPerson', {projectName, person})
socket.on(projectName + ':newPerson', ({person: newPerson}) => {
  if (newPerson !== person) {
    store.dispatch(addPerson(newPerson))
  }
})
socket.on(projectName + ':disconnect', ({person: disconnectedPerson}) => {
  if (disconnectedPerson !== person) {
    store.dispatch(removePerson(disconnectedPerson))
  }
})
socket.on(projectName + ':bugCreated', (bugs) => {
  store.dispatch(receiveBugs(bugs))
})
socket.on(projectName + ':bugUpdated', ({updatedBug, updatedKey, person: updater}) => {
  if (person === updater) {
    return
  }
  var rtUpdateKey = updatedBug._id + ':' + updatedKey
  store.dispatch(receiveBugs([updatedBug]))
  store.dispatch(rtUpdate({rtUpdateKey, person: updater}))
})

ReactDOM.render((
  <Provider store={store}>
    <DrewView/>
  </Provider>
), document.getElementById('root'))
