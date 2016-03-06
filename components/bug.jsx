import React from 'react'
import { connect } from 'react-redux'

const EditableField = ({rtUpdates, children, people}) => {
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

const Bug = React.createClass({
  displayName: 'Bug',

  propTypes: {
    bug: React.PropTypes.object.isRequired,
    rtUpdates: React.PropTypes.object,
    people: React.PropTypes.object
  },

  render: function () {
    var rtUpdates = this.props.rtUpdates || {}
    var { _id, description, priority, owner, reporter, status } = this.props.bug
    var priorityOptions = ['Low', 'Medium', 'High', 'Highest']
    return (
      <div style={{margin: '20px', padding: '10px', backgroundColor: 'grey', textAlign: 'center'}}className='bug' data-bug-id={_id}>
        <EditableField rtUpdates={rtUpdates.owner} people={this.props.people}>
          <div>Owner: {owner}</div>
        </EditableField>
        <EditableField rtUpdates={rtUpdates.reporter} people={this.props.people}>
          <div>Reporter: {reporter}</div>
        </EditableField>
        <EditableField rtUpdates={rtUpdates.status} people={this.props.people}>
          <div>Status: {status}</div>
        </EditableField>
        <EditableField rtUpdates={rtUpdates.priority} people={this.props.people}>
          Priority:
          <select value={priority}>
            {priorityOptions.map((priorityOption) => {
              return (<option key={priorityOption} value={priorityOption}>{priorityOption}</option>)
            })}
          </select>
        </EditableField>
        <EditableField rtUpdates={rtUpdates.description} people={this.props.people}>
          <div>Description: {description}</div>
        </EditableField>
      </div>
    )
  }
})

const mapStateToProps = function ({bugs, rtUpdates, people}, {id}) {
  return {
    bug: bugs[id],
    rtUpdates: rtUpdates[id],
    people
  }
}
export default connect(mapStateToProps)(Bug)
