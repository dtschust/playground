import React from 'react'
import Input from '@nerdwallet/react-input'

var UncontrolledValidatedInput = React.createClass({
  displayName: 'Uncontrolled Validated Input',
  propTypes: {
    defaultValue: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    validate: React.PropTypes.func.isRequired,
    displayValidation: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      defaultValue: '',
      displayValidation: true
    }
  },

  getInitialState: function () {
    return {
      value: this.props.defaultValue,
      validation: {
        isValid: true,
        errors: [],
        feedback: []
      }
    }
  },

  onChange: function (e) {
    // value is either e or e.target.value
    var value = e.target ? e.target.value : e
    var validation = this.validate(value)
    this.setState({value, validation})
  },

  validate: function (value) {
    return this.props.validate(value)
  },

  // public interface
  isValid: function () {
    return this.getValidation().isValid
  },

  getValue: function () {
    return this.state.value
  },

  getValidation: function () {
    var validation = this.validate(this.state.value)
    this.setState({validation})
    return validation
  },
  // end public interface

  render: function () {
    var props = {...this.props}
    var validation = {...this.state.validation}
    if (!this.props.displayValidation) {
      validation.errors = []
      validation.feedback = []
    }
    delete props.validate
    delete props.displayValidation
    return (
      <Input {...props} onChange={this.onChange} validation={validation}/>
    )
  }
})

module.exports = UncontrolledValidatedInput
