import React from 'react'
import { connect } from 'react-redux'
// import { fetchBugs, createBug } from '../redux/actions.js'
import Bug from './bug'

const BugsContainer = connect((store) => store)(React.createClass({
  displayName: 'Bugs Container',

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    bugs: React.PropTypes.object.isRequired,
    rtUpdates: React.PropTypes.object,
    people: React.PropTypes.object
  },

  // renderBugRow: function (bug) {
  //   var { _id, status, description, priority, owner, reporter, screenshotURL, consoleErrors, state, actions, notes } = bug
  //   return (
  //     <tr key={_id} className='bugs-table-row'>
  //       <td className='bugs-table-cell'>{status}</td>
  //       <td className='bugs-table-cell'>{owner}</td>
  //       <td className='bugs-table-cell'>{priority}</td>
  //       <td className='bugs-table-cell'>{description}</td>
  //       <td className='bugs-table-cell'>{reporter}</td>
  //       <td className='bugs-table-cell'>{screenshotURL}</td>
  //       <td className='bugs-table-cell'>{consoleErrors}</td>
  //       <td className='bugs-table-cell'>{actions}</td>
  //       <td className='bugs-table-cell'>{state}</td>
  //       <td className='bugs-table-cell'>Links</td>
  //       <td className='bugs-table-cell'>{notes}</td>
  //     </tr>
  //   )
  // },

  componentDidMount: function () {
    // this.props.dispatch(fetchBugs())
  },

  createBug: function (e) {
    // e.preventDefault()
    // var inputs = ['description', 'priority', 'reporter', 'screenshotURL', 'notes']
    // var bug = inputs.reduce((prev, curr) => {
    //   prev[curr] = this.refs[curr].value
    //   return prev
    // }, {})
    // this.props.dispatch(createBug(bug))
  },

  render: function () {
    // var { bugs: bugObjects, people, rtUpdates } = this.props
    // var bugs = []
    // Object.keys(bugObjects).forEach((bugId) => {
    //   bugs.push(bugObjects[bugId])
    // })
    var bugIds = Object.keys(this.props.bugs)
    var rows = bugIds.map((bugId) => {
      // var id = bug['_id']
      return (<Bug key={bugId} id={bugId} />)
    })
    /* bug={bug} rtUpdates={rtUpdates[id]} people={people} */
    return (
      <div>
        { rows }
      </div>
    )
  },

  renderzz: function () {
    var { bugs } = this.props
    var rows = []
    Object.keys(bugs).forEach((bugId) => {
      rows.push(this.renderBugRow(bugs[bugId]))
    })
    return (
      <div className='bugs-container'>
        <h1 className='bugs-container-header'>Bugs</h1>
        <div className='bugs-table-container'>
          <table className='bugs-table'>
            <thead>
              <tr className='bugs-table-header-row'>
                <th className='bugs-table-header'>Status</th>
                <th className='bugs-table-header'>Owner</th>
                <th className='bugs-table-header'>Priority</th>
                <th className='bugs-table-header'>Description</th>
                <th className='bugs-table-header'>Reporter</th>
                <th className='bugs-table-header'>Screenshot</th>
                <th className='bugs-table-header'>Console Errors</th>
                <th className='bugs-table-header'>Redux Actions</th>
                <th className='bugs-table-header'>Redux State</th>
                <th className='bugs-table-header'>Mixpanel Links</th>
                <th className='bugs-table-header'>Developer Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          <div style={{marginTop: '100px'}} className='bug-reporter'>
            <form onSubmit={this.createBug}>
              <input type='text' placeholder='description' ref='description'/>
              <select ref='priority'>
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
                <option value='Highest'>Highest</option>
              </select>
              <input type='text' placeholder='reporter' ref='reporter'/>
              <input type='text' placeholder='Screenshot URL' ref='screenshotURL'/>
              <input type='text' placeholder='notes' ref='notes'/>
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}))

export default BugsContainer
