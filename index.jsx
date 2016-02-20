import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { PrimaryButton } from '@nerdwallet/react-button'
import UncontrolledValidatedInput from './components/uncontrolled-validated-input'
import UncontrolledEmailInput from './components/uncontrolled-email-input'
import UncontrolledPasswordInput from './components/uncontrolled-password-input'

require('./styles/index.less')

const areInputsValid = (inputs) => {
  var allValid = true
  inputs.forEach((input) => {
    var isValid = input.isValid()
    if (!isValid) {
      allValid = false
    }
  })
  return allValid
}

var Index = React.createClass({
  displayName: 'Index',

  register: function (e) {
    e.preventDefault()
    const { email, password, firstName, lastName } = this.refs
    var inputs = [email, password, firstName, lastName]
    if (!areInputsValid(inputs)) {
      console.log('invalid inputs, not registering')
      return
    }
    var registrationData = inputs.map((input) => input.getValue())
    console.log('registering:', ...registrationData)
  },

  validateName: function (feedbackMsg) {
    return function (value) {
      var validation = {
        isValid: true,
        errors: [],
        feedback: []
      }
      if (value.length <= 0) {
        validation.isValid = false
        validation.errors = ['required-field']
        validation.feedback = [feedbackMsg]
      }
      return validation
    }
  },

  render: function () {
    return (
      <div style={{width: '300px', margin: '30px auto'}} className={classnames('container')}>
        <form onSubmit={this.register}>
          <UncontrolledValidatedInput placeholder='First Name' ref='firstName' validate={this.validateName('First name required')}/>
          <UncontrolledValidatedInput placeholder='Last Name' ref='lastName' validate={this.validateName('Last name required')}/>
          <UncontrolledEmailInput placeholder='Email Address' ref='email'/>
          <UncontrolledPasswordInput placeholder='Password' ref='password' type='password'/>
          <PrimaryButton type='submit'>Submit</PrimaryButton>
        </form>
      </div>
    )
  }
})

ReactDOM.render(<Index/>, document.getElementById('root'))
