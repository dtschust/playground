import React from 'react'
import { connect } from 'react-redux'
import {status, priority} from '../bug-enums'
import { createBug } from '../redux/actions'

const BugCreator = React.createClass({
  displayName: 'Bug Creator',

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    identity: React.PropTypes.string,
    projectName: React.PropTypes.string
  },
  onSubmit: function (e) {
    e.preventDefault()
    var inputs = Object.keys(this.refs)
    var form = this.form

    var reporter = this.props.identity
    var formData = inputs.reduce((prev, curr) => {
      prev[curr] = this.refs[curr].value
      return prev
    }, {})
    formData.reporter = reporter
    formData.projectName = this.props.projectName
    this.props.dispatch(createBug(formData)).then(function () {
      form.reset()
    })
  },
  render: function () {
    return (
      <div style={{margin: '20px', padding: '10px'}} className='bug-creator'>
        <h3>Bug Creator</h3>
        <form ref={(f) => this.form = f} onSubmit={this.onSubmit}>
          Status:
          <select ref='status' defaultValue={status.default}>
            {status.enum.map((statusOption) => {
              return (<option key={statusOption} value={statusOption}>{statusOption}</option>)
            })}
          </select>
          Priority:
          <select ref='priority' defaultValue={priority.default}>
            {priority.enum.map((priorityOption) => {
              return (<option key={priorityOption} value={priorityOption}>{priorityOption}</option>)
            })}
          </select>

          <input placeholder='description' ref='description'/>
          <input placeholder='owner' ref='owner'/>
          <input placeholder='screenshot URL' ref='screenshotURL'/>
          <input placeholder='notes' ref='notes'/>
          <input placeholder='jira URL' ref='jiraURL'/>
          <button type='submit'>Create Bug!</button>
        </form>
      </div>
    )
  }
})

export default connect(({identity, projectName}) => ({identity, projectName}))(BugCreator)
