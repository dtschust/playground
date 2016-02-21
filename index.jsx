import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { PrimaryButton } from '@nerdwallet/react-button'
import Slider from '@nerdwallet/greg-slider'
import EmailInput from './components/email-input'
import PasswordInput from './components/password-input'
import InputValidator from './components/input-validator'
import Input from '@nerdwallet/react-input'

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
    const { email, password, firstName, lastName, sliderValue } = this.refs
    var inputs = [email, password, firstName, lastName, sliderValue]
    if (!areInputsValid(inputs)) {
      console.log('invalid inputs, not registering')
      return
    }
    var registrationData = inputs.map((input) => input.getValue())
    console.log('registering:', ...registrationData)
  },

  getInitialState: function () {
    return {
      sliderValue: 0
    }
  },

  handleSliderValueChange: function (e) {
    var sliderValue = parseFloat(e.target ? e.target.value : e)
    if (this.state.sliderValue !== sliderValue) {
      this.setState({sliderValue})
    }
  },

  lessThanFifty: function (value) {
    var validation = {
      isValid: true,
      errors: [],
      feedback: []
    }
    if (value < 50) {
      validation.isValid = false
      validation.errors = ['required-field']
      validation.feedback = ['Value must be less than fifty']
    }
    return validation
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
          <InputValidator ref='firstName' validate={this.validateName('First Name required')}>
            <Input placeholder='First Name'/>
          </InputValidator>
          <InputValidator ref='lastName' validate={this.validateName('Last Name required')}>
            <Input placeholder='Last Name'/>
          </InputValidator>
          <EmailInput placeholder='Email Address' ref='email'/>
          <PasswordInput placeholder='Password' ref='password' type='password'/>
          <PrimaryButton type='submit'>Submit</PrimaryButton>
        </form>
        <div style={{marginTop: '20px'}}>
          <Slider value={this.state.sliderValue} min={0} max={100} onChange={this.handleSliderValueChange}/>
          <InputValidator ref='sliderValue' validate={this.lessThanFifty}>
            <Input value={this.state.sliderValue} onChange={this.handleSliderValueChange}/>
          </InputValidator>
        </div>
      </div>
    )
  }
})

ReactDOM.render(<Index/>, document.getElementById('root'))
