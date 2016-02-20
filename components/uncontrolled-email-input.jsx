import React from 'react'
import UncontrolledValidatedInput from './uncontrolled-validated-input'
import { isEmail } from 'validator'

var UncontrolledEmailInput = React.createClass({
  displayName: 'Uncontrolled Email Input',
  propTypes: {
  },

  validate: function (value) {
    var validation = {
      isValid: true,
      errors: [],
      feedback: []
    }
    if (!isEmail(value)) {
      validation.isValid = false
      validation.errors = ['invalid-email']
      validation.feedback = ['Please enter a valid email address']
    }
    return validation
  },

  // public interface
  isValid: function () {
    return this.refs.input.isValid()
  },

  getValue: function () {
    return this.refs.input.getValue()
  },

  getValidation: function () {
    return this.refs.input.getValidation()
  },
  // end public interface

  render: function () {
    return (
      <UncontrolledValidatedInput ref='input' validate={this.validate} {...this.props}/>
    )
  }
})

module.exports = UncontrolledEmailInput
