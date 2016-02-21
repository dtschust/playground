import React from 'react'

var InputValidator = React.createClass({
  displayName: 'Input Validator',
  propTypes: {
    children: React.PropTypes.element.isRequired,
    validate: React.PropTypes.func.isRequired,
    displayValidation: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      displayValidation: true
    }
  },

  getInitialState: function () {
    var value = this.props.children.props.value || this.props.children.props.defaultValue || ''
    return {
      value,
      validation: {
        isValid: true,
        errors: [],
        feedback: []
      }
    }
  },

  componentWillReceiveProps: function (nextProps) {
    var newValue = nextProps.children.props.value
    if (this.props.children.props.value !== newValue) {
      var validation = this.validate(newValue)
      this.setState({value: newValue, validation})
    }
  },

  onChange: function (e) {
    var childProps = this.props.children.props
    var originalOnChange = childProps.onChange
    // value is either e or e.target.value
    var value = e.target ? e.target.value : e
    var validation = this.validate(value)
    this.setState({value, validation})
    originalOnChange && originalOnChange(...arguments)
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
    var validation = {...this.state.validation}
    if (!this.props.displayValidation) {
      validation.errors = []
      validation.feedback = []
    }
    return React.cloneElement(this.props.children, {onChange: this.onChange, validation})
  }
})

module.exports = InputValidator
