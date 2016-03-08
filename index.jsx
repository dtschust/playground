import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { updateFilter, identify, receiveBugs, fetchBugs, fetchPeople, loadProjectName } from './redux/actions.js'
import configureStore from './redux/configureStore'
import DrewView from './components/drew-view'
import initRealTime from './real-time'

require('./styles/index.less')

var store = configureStore()

// Pull data from global variables
if (window.bugId) {
  store.dispatch(updateFilter({ _id: window.bugId }))
}
if (window.initialBugs) {
  store.dispatch(receiveBugs(window.initialBugs))
}
var projectName = window.projectName.toLowerCase()
store.dispatch(loadProjectName(projectName))

// prompt for identity
var identity = window.localStorage.getItem('identity')
while (!identity) {
  identity = window.prompt('Please enter your name')
  window.localStorage.setItem('identity', identity)
}

store.dispatch(identify(identity))

// Fetch users who connected before us
store.dispatch(fetchPeople())

// Fetch bugs every minute
setInterval(function () {
  store.dispatch(fetchBugs())
  store.dispatch(fetchPeople())
}, 60000)

// Connect to socket.io and listen to the right events
initRealTime(store)

ReactDOM.render((
  <Provider store={store}>
    <DrewView/>
  </Provider>
), document.getElementById('root'))
