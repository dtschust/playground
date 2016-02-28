/* global io */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { fetchBugs, receiveBugs } from './redux/actions.js'
import configureStore from './redux/configureStore'

require('./styles/index.less')

var Index = connect(store => store)(React.createClass({
  displayName: 'Index',

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    bugs: React.PropTypes.object.isRequired
  },

  renderBugRow: function (bug) {
    var { name, description, complete, screenshotURL, consoleErrors } = bug
    return (
      <tr>
        <td>{complete ? 'Complete' : 'Not Complete'}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>{screenshotURL}</td>
        <td>{consoleErrors}</td>
      </tr>
    )
  },

  componentDidMount: function () {
    this.props.dispatch(fetchBugs())
    var socket = io()
    socket.on('bugUpdate', (bugs) => {
      this.props.dispatch(receiveBugs(bugs))
    })
  },

  render: function () {
    var { bugs } = this.props
    var rows = []
    Object.keys(bugs).forEach((bugId) => {
      rows.push(this.renderBugRow(bugs[bugId]))
    })
    return (
      <div>
        <h1>Hello World</h1>
        <table>
          <thead>
            <tr>
              <th>Complete</th>
              <th>Name</th>
              <th>Description</th>
              <th>Screenshot</th>
              <th>Errors</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}))

var store = configureStore()

ReactDOM.render((
  <Provider store={store}>
    <Index/>
  </Provider>
), document.getElementById('root'))
