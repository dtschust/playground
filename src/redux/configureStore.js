import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { storeEnhancer } from 'redux-bug-reporter'
import thunk from 'redux-thunk'

import history from '../history'
import rootReducer from './rootReducer'
const historyMiddleware = routerMiddleware(history)

let store = createStore(
  rootReducer,
  compose(
    storeEnhancer,
    applyMiddleware(thunk),
    applyMiddleware(historyMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
