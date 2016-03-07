import React from 'react'
import { connect } from 'react-redux'
import { focusOnBug } from '../redux/actions'
import EditableField from './editable-field'
import classnames from 'classnames'

const Bug = React.createClass({
  displayName: 'Bug',

  propTypes: {
    dispatch: React.PropTypes.func,
    bug: React.PropTypes.object.isRequired,
    rtUpdates: React.PropTypes.object,
    sortKey: React.PropTypes.string,
    isFocused: React.PropTypes.bool,
    people: React.PropTypes.array
  },

  focusOnBug: function (e) {
    e.stopPropagation()
    this.props.dispatch(focusOnBug(this.props.bug._id))
  },

  render: function () {
    var { _id, consoleErrors, createdAt, updatedAt } = this.props.bug
    var { isFocused } = this.props
    return (
      <div style={{margin: '20px', padding: '10px', backgroundColor: 'grey', textAlign: 'center'}}
        className={classnames('bug', {focused: isFocused})} onClick={this.focusOnBug}>
        <EditableField fieldName='status' id={_id}/>
        <EditableField fieldName='description' id={_id}/>
        <EditableField fieldName='priority' id={_id}/>
        <EditableField fieldName='owner' id={_id}/>
        <EditableField fieldName='reporter' id={_id}/>
        <EditableField fieldName='screenshotURL' id={_id}/>
        <EditableField fieldName='notes' id={_id}/>
        <EditableField fieldName='pullRequestURL' id={_id}/>
        <EditableField fieldName='jiraURL' id={_id}/>
        <div className='hide-until-focused'>Console Errors: {JSON.stringify(consoleErrors)}</div>
        <div className='hide-until-focused'>Created at: {createdAt}</div>
        <div className='hide-until-focused'>Updated at: {updatedAt}</div>
      </div>
    )
  }
})

const mapStateToProps = function ({bugs, rtUpdates, people, sort, focus}, {id}) {
  return {
    bug: bugs[id],
    isFocused: focus === id,
    rtUpdates: rtUpdates[id],
    sortKey: sort.sortKey,
    people
  }
}
export default connect(mapStateToProps)(Bug)
