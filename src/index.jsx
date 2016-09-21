import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import history from './history'
import Container from './Container'
import Home from './routes/Home'
import Foo from './routes/Foo'
import store from './redux/configureStore'
import './styles/index.less'

const NoMatch = () => {
  return (
    <h1>404 not found</h1>
  )
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// Create an enhanced history that syncs navigation events with the store
const syncedHistory = syncHistoryWithStore(history, store)

// example onEnter hook
const checkAuth = function (nextState, replace) {
  // const { user } = store.getState()
  // if (false) {
  //   replace('/')
  // }
}

var Index = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={syncedHistory}>
          <Route path='/' component={Container}>
            <IndexRoute component={Home} />
            <Route path='home' component={Home} onEnter={checkAuth} />
            <Route path='*' component={NoMatch} />
          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}

document.addEventListener('DOMContentLoaded', function domLoaded (event) {
  ReactDOM.render(<Index />, document.getElementById('root'))
})
