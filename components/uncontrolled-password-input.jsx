import React from 'react'
import UncontrolledValidatedInput from './uncontrolled-validated-input'
import classnames from 'classnames'

var UncontrolledPasswordInput = React.createClass({
  displayName: 'Uncontrolled Password Input',
  propTypes: {
    showPasswordRequirements: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      showPasswordRequirements: true
    }
  },

  getInitialState: function () {
    return {
      validation: {
        isValid: true,
        errors: [],
        feedback: []
      }
    }
  },

  validate: function (value) {
    var validation = {
      isValid: true,
      errors: [],
      feedback: []
    }

    var lenCheck = value.length < 8
    var capCheck = !/[A-Z]/.test(value)
    var specCheck = !/[\d\W]/.test(value)

    validation.isValid = !(lenCheck || capCheck || specCheck)

    validation.feedback.push({ text: 'Eight character minimum', valid: !lenCheck })
    validation.feedback.push({ text: 'One uppercase letter', valid: !capCheck })
    validation.feedback.push({ text: 'One numeral or special character', valid: !specCheck })
    console.log('validated')
    this.setState({validation})
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

  renderPasswordRequirements: function () {
    var validation = this.state.validation.feedback
    return (
      <div className='password-requirements'>
        <span className='feedback-header'>Requirements:</span>
        {validation.map((feedback, i) => {
          return (
            <span key={'feedback ' + i} className={classnames('feedback', {valid: feedback.valid})}>
              <span className='ss-check'></span>
              {feedback.text}
            </span>
          )
        })}
      </div>
    )
  },

  render: function () {
    var props = {...this.props}
    delete props.showPasswordRequirements
    return (
      <div>
        <UncontrolledValidatedInput ref='input' validate={this.validate} {...this.props} displayValidation={false}/>
        {this.props.showPasswordRequirements ? this.renderPasswordRequirements() : null}
      </div>
    )
  }
})

module.exports = UncontrolledPasswordInput
