var { createStore, applyMiddleware, compose } = require('redux')
var thunkMiddleware = require('redux-thunk')
var { rootReducer } = require('./reducers')

var middlewares = [ thunkMiddleware ]

const createStoreWithMiddleware = compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

module.exports = function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
