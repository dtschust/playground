/* global io */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { receiveBugs } from './redux/actions.js'
import configureStore from './redux/configureStore'
import BugsContainer from './components/bugs-container'

require('./styles/index.less')

var store = configureStore()

var socket = io()
socket.on('bugUpdate', (bugs) => {
  store.dispatch(receiveBugs(bugs))
})

ReactDOM.render((
  <Provider store={store}>
    <BugsContainer/>
  </Provider>
), document.getElementById('root'))
