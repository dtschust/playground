import React from 'react'
import { connect } from 'react-redux'
import {startEditing, endEditing, updateBug} from '../redux/actions'
import EditToggle from './edit-toggle'
import classnames from 'classnames'
// import CSSTransitionGroup from 'react-addons-css-transition-group'
import { status as statusOptions, priority as priorityOptions } from '../bug-enums'

const GenericFieldDisplay = ({value, displayName}) => {
  return (
    <div className='editable-field-static' key={value}>
      <div className='editable-field__label'>{displayName}</div>
      <div className='editable-field__value'>{value}</div>
    </div>
  )
}

const ImageDisplay = ({value, displayName}) => {
  return (
    <div className='editable-field-static editable-field-static--image' key={value}>
      <img src={value}/>
    </div>
  )
}

var fieldNameConfig = {
  status: {
    displayName: 'Status',
    editType: 'select',
    options: statusOptions.enum,
    hideUntilFocused: false
  },
  description: {
    displayName: 'Description',
    editType: 'textarea',
    hideUntilFocused: false
  },
  priority: {
    displayName: 'Priority',
    editType: 'select',
    options: priorityOptions.enum,
    hideUntilFocused: false
  },
  owner: {
    displayName: 'Owner',
    editType: 'text',
    hideUntilFocused: false
  },
  reporter: {
    displayName: 'Reporter',
    editType: 'text',
    hideUntilFocused: true
  },
  screenshotURL: {
    displayName: 'Screenshot',
    editType: 'text',
    customElement: ImageDisplay,
    hideUntilFocused: true
  },
  notes: {
    displayName: 'Notes',
    editType: 'textarea',
    hideUntilFocused: false
  },
  pullRequestURL: {
    displayName: 'PR',
    editType: 'text',
    hideUntilFocused: true
  },
  jiraURL: {
    displayName: 'Jira',
    editType: 'text',
    hideUntilFocused: true
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
    colorIndex: React.PropTypes.number,
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
    var { editType, displayName } = fieldNameConfig[fieldName]
    if (editType === 'text') {
      return (
        <div>
          <form onSubmit={this.updateBugFromInput}>
            <div className='editable-field__label'>{displayName}</div>
            <input ref='formInput' type='text' defaultValue={value} onBlur={this.updateBugFromInput}/>
            <div>
              <button type='submit'>Save</button>
            </div>
          </form>
        </div>
      )
    } else if (editType === 'textarea') {
      return (
        <div>
          <form onSubmit={this.updateBugFromInput}>
            <div className='editable-field__label'>{displayName}</div>
            <textarea ref='formInput' defaultValue={value} onBlur={this.updateBugFromInput}/>
            <div>
              <button type='submit'>Save</button>
            </div>
          </form>
        </div>
      )
    }
  },

  renderStaticState: function () {
    var { fieldName, value } = this.props
    var { displayName, customElement } = fieldNameConfig[fieldName]
    var Elem = customElement || GenericFieldDisplay
    return (
      <div className='editable-field-static-container'>
        <Elem value={value} displayName={displayName}/>
      </div>
    )
  },

  renderSelect: function () {
    var { fieldName, value, externallyUpdated, colorIndex } = this.props
    var { displayName, options, hideUntilFocused } = fieldNameConfig[fieldName]
    return (
      <div className={classnames('editable-field',
        'editable-field--' + fieldName,
        {'editable-field--externally-updated': externallyUpdated},
        {'hide-until-focused': hideUntilFocused},
        colorIndex ? 'color' + colorIndex : ''
      )}>
        <div className='editable-field-static-container'>
          <div className='editable-field-static' key={value}>
            <div className='editable-field__label'>{displayName}</div>
            <select key={value} defaultValue={value} onChange={this.updateBugFromSelect}>
              {options.map((option) => {
                return (<option key={option} value={option}>{option}</option>)
              })}
            </select>
          </div>
        </div>
        <div className={classnames('editable-field__updater', colorIndex ? 'color' + colorIndex : '')}>
          {externallyUpdated}
        </div>
      </div>
    )
  },

  render: function () {
    var { fieldName, isEdit, externallyUpdated, colorIndex } = this.props
    var { editType, hideUntilFocused } = fieldNameConfig[fieldName]
    var eventHandlers = {}
    if (!isEdit) {
      eventHandlers.onClick = this.toggleEdit
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
        {'editable-field--externally-updated': externallyUpdated},
        {'hide-until-focused': hideUntilFocused},
        colorIndex ? 'color' + colorIndex : '')}
        {...eventHandlers}>
        <EditToggle isEdit={isEdit} toggleEdit={this.toggleEdit}/>
        <div className='editable-field__content'>
          {content}
        </div>
        <div className={classnames('editable-field__updater', colorIndex ? 'color' + colorIndex : '')}>
          {externallyUpdated}
        </div>
      </div>
    )
  }

})

const mapStateToProps = function ({bugs, localEdits, rtUpdates, people}, {fieldName, id}) {
  var externallyUpdated = rtUpdates[id + ':' + fieldName]
  var colorIndex
  if (externallyUpdated) {
    colorIndex = people.indexOf(externallyUpdated)
  }
  return {
    fieldName: fieldName,
    value: bugs[id][fieldName],
    people,
    id,
    colorIndex,
    externallyUpdated,
    isEdit: (localEdits.id === id && localEdits.field === fieldName)
  }
}

export default connect(mapStateToProps)(EditableField)
