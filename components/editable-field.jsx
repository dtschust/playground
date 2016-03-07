import React from 'react'
import { connect } from 'react-redux'
import {startEditing, endEditing, updateBug} from '../redux/actions'
import EditToggle from './edit-toggle'
import classnames from 'classnames'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { status as statusOptions, priority as priorityOptions } from '../bug-enums'

var fieldNameConfig = {
  status: {
    displayName: 'Status',
    editType: 'select',
    options: statusOptions.enum
  },
  description: {
    displayName: 'Description',
    editType: 'textarea'
  },
  priority: {
    displayName: 'Priority',
    editType: 'select',
    options: priorityOptions.enum
  },
  owner: {
    displayName: 'Owner',
    editType: 'text'
  },
  reporter: {
    displayName: 'Reporter',
    editType: 'text'
  },
  screenshotURL: {
    displayName: 'Screenshot',
    editType: 'text'
  },
  notes: {
    displayName: 'Notes',
    editType: 'textarea'
  },
  pullRequestURL: {
    displayName: 'PR',
    editType: 'text'
  },
  jiraURL: {
    displayName: 'Jira',
    editType: 'text'
  }
}
const EditableField = React.createClass({
  displayName: 'Editable Field',

  propTypes: {
    dispatch: React.PropTypes.func,
    fieldName: React.PropTypes.string.isRequired,
    id: React.PropTypes.string,
    value: React.PropTypes.string,
    isEdit: React.PropTypes.bool,
    externallyUpdated: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ])
  },

  updateBugFromSelect: function (e) {
    var {id, fieldName} = this.props
    var update = {
      _id: id,
      [fieldName]: e.target.value
    }
    this.props.dispatch(updateBug(update))
    this.props.dispatch(endEditing())
  },

  updateBugFromInput: function (e) {
    e.preventDefault()
    var {id, fieldName} = this.props
    var { defaultValue, value } = this.refs.formInput
    if (defaultValue === value) {
      this.props.dispatch(endEditing())
      return
    }
    var update = {
      _id: id,
      [fieldName]: value
    }
    this.props.dispatch(updateBug(update))
    this.props.dispatch(endEditing())
  },

  toggleEdit: function () {
    if (this.props.isEdit) {
      this.props.dispatch(endEditing())
    } else {
      this.props.dispatch(startEditing({
        id: this.props.id,
        field: this.props.fieldName
      }))
    }
  },

  renderEditState: function () {
    var { fieldName, value } = this.props
    var { editType } = fieldNameConfig[fieldName]
    if (editType === 'text') {
      return (
        <div>
          <form onSubmit={this.updateBugFromInput}>
            <input ref='formInput' type='text' defaultValue={value} onBlur={this.updateBugFromInput}/>
            <button type='submit'>Save</button>
          </form>
        </div>
      )
    } else if (editType === 'textarea') {
      return (
        <div>
          <form onSubmit={this.updateBugFromInput}>
            <textarea ref='formInput' defaultValue={value} onBlur={this.updateBugFromInput}/>
            <button type='submit'>Save</button>
          </form>
        </div>
      )
    }
  },

  renderStaticState: function () {
    var { fieldName, value } = this.props
    var { displayName } = fieldNameConfig[fieldName]
    return (
      <div className='editable-field-static-container'>
        <CSSTransitionGroup transitionName='transition-fade' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          <div className='editable-field-static' key={value}>{displayName}:{value}</div>
        </CSSTransitionGroup>
      </div>
    )
  },

  renderSelect: function () {
    var { fieldName, value, externallyUpdated } = this.props
    var { displayName, options } = fieldNameConfig[fieldName]
    return (
      <div className={classnames('editable-field',
        'editable-field--' + fieldName,
        {'editable-field--externally-updated': externallyUpdated})}>
        <div className='editable-field-static-container'>
          <CSSTransitionGroup transitionName='transition-fade' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            <div className='editable-field-static' key={value}>
              {displayName}:
              <select key={value} defaultValue={value} onChange={this.updateBugFromSelect}>
                {options.map((option) => {
                  return (<option key={option} value={option}>{option}</option>)
                })}
              </select>
            </div>
          </CSSTransitionGroup>
        </div>
        {externallyUpdated}
      </div>
    )
  },

  render: function () {
    var { fieldName, value, isEdit, externallyUpdated } = this.props
    var { editType } = fieldNameConfig[fieldName]
    var eventHandlers = {}
    if (!isEdit) {
      eventHandlers.onClick = this.toggleEdit
    }
    if (!value) {
      return <span/>
    }
    if (editType === 'select') {
      return this.renderSelect()
    }
    var content
    if (isEdit) {
      content = this.renderEditState()
    } else {
      content = this.renderStaticState()
    }
    return (
      <div className={classnames('editable-field',
        'editable-field--' + fieldName,
        {'editable-field--externally-updated': externallyUpdated})}
        {...eventHandlers}>
        <EditToggle isEdit={isEdit} toggleEdit={this.toggleEdit}/>
        {content}
        {externallyUpdated}
      </div>
    )
  }

})

const mapStateToProps = function ({bugs, localEdits, rtUpdates}, {fieldName, id}) {
  return {
    fieldName: fieldName,
    value: bugs[id][fieldName],
    id: id,
    externallyUpdated: rtUpdates[id + ':' + fieldName],
    isEdit: (localEdits.id === id && localEdits.field === fieldName)
  }
}

export default connect(mapStateToProps)(EditableField)
