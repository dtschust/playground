/* global io */
import { receiveBugs, rtUpdate, addPerson, removePerson } from './redux/actions.js'

export default function initRealTime (store) {
  var socket = io()
  var {identity: person, projectName} = store.getState().identity

  // announce new connection
  socket.emit('newPerson', {projectName, person})

  // Listen for new connections
  socket.on(projectName + ':newPerson', ({person: newPerson}) => {
    if (newPerson !== person) {
      store.dispatch(addPerson(newPerson))
    }
  })

  // Listen for disconnections
  socket.on(projectName + ':disconnect', ({person: disconnectedPerson}) => {
    if (disconnectedPerson !== person) {
      store.dispatch(removePerson(disconnectedPerson))
    }
  })

  // Listen for new bugs
  socket.on(projectName + ':bugCreated', (bugs) => {
    store.dispatch(receiveBugs(bugs))
  })

  // Listen for bug updates
  socket.on(projectName + ':bugUpdated', ({updatedBug, updatedKey, person: updater}) => {
    if (person === updater) {
      return
    }
    var rtUpdateKey = updatedBug._id + ':' + updatedKey
    store.dispatch(receiveBugs([updatedBug]))
    store.dispatch(rtUpdate({rtUpdateKey, person: updater}))
  })

  // TODO: Emit when the user tabs out
  document.addEventListener('visibilitychange', function () {
    console.log(document.visibilityState)
  })
}
