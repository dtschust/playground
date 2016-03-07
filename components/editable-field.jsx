import React from 'react'

const EditableField = React.createClass({
  displayName: 'Bug',

  propTypes: {
    rtUpdates: React.PropTypes.object,
    type: React.PropTypes.oneOf(['select, text, textarea']),
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]),
    people: React.PropTypes.object
  },

  render: function () {
    var {rtUpdates, children, people} = this.props
    var classes = rtUpdates ? 'editable-field new' : 'editable-field'
    var style = {}
    if (rtUpdates) {
      style = {backgroundColor: people[rtUpdates]}
    }
    return (
      <div style={style} className={classes}>
        {rtUpdates && <div>Edited by {rtUpdates}</div>}
        {children}
      </div>
    )
  }

})

export default EditableField
