import React from 'react'
import { connect } from 'react-redux'
import EditableField from './editable-field'

const Bug = React.createClass({
  displayName: 'Bug',

  propTypes: {
    bug: React.PropTypes.object.isRequired,
    rtUpdates: React.PropTypes.object,
    sortKey: React.PropTypes.string,
    people: React.PropTypes.array
  },

  render: function () {
    var { _id, consoleErrors } = this.props.bug
    return (
      <div style={{margin: '20px', padding: '10px', backgroundColor: 'grey', textAlign: 'center'}}
        className='bug'>
        <EditableField fieldName='status' id={_id}/>
        <EditableField fieldName='description' id={_id}/>
        <EditableField fieldName='priority' id={_id}/>
        <EditableField fieldName='owner' id={_id}/>
        <EditableField fieldName='reporter' id={_id}/>
        <EditableField fieldName='screenshotURL' id={_id}/>
        <EditableField fieldName='notes' id={_id}/>
        <EditableField fieldName='pullRequestURL' id={_id}/>
        <EditableField fieldName='jiraURL' id={_id}/>
        <div>
          <div>Console Errors: {JSON.stringify(consoleErrors)}</div>
        </div>
      </div>
    )
  }
})

const mapStateToProps = function ({bugs, rtUpdates, people, sort}, {id}) {
  return {
    bug: bugs[id],
    rtUpdates: rtUpdates[id],
    sortKey: sort.sortKey,
    people
  }
}
export default connect(mapStateToProps)(Bug)
