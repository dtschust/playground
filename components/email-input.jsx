import React from 'react'
import InputValidator from './input-validator'
import Input from '@nerdwallet/react-input'
import { isEmail } from 'validator'

var EmailInput = React.createClass({
  displayName: 'Email Input',
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
    return this.refs.validator.isValid()
  },

  getValue: function () {
    return this.refs.validator.getValue()
  },

  getValidation: function () {
    return this.refs.validator.getValidation()
  },
  // end public interface

  render: function () {
    return (
      <InputValidator ref='validator' validate={this.validate}>
        <Input {...this.props}/>
      </InputValidator>
    )
  }
})

module.exports = EmailInput
