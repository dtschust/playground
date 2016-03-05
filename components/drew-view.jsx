import React from 'react'
import { connect } from 'react-redux'
// import { fetchBugs, createBug } from '../redux/actions.js'
import Bug from './bug'
import People from './people'

const DrewView = connect(({bugs, people}) => ({bugs, people}))(React.createClass({
  displayName: 'Drew View',

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    bugs: React.PropTypes.object.isRequired
  },

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
    var bugIds = Object.keys(this.props.bugs)

    // people component
    // sortby component
    // filters component
    // list of bugs
    // bug creator
    return (
      <div>
        <People/>
        <div className='bugs-container'>
          {
            bugIds.map((bugId) => {
              return (<Bug key={bugId} id={bugId}/>)
            })
          }
        </div>
      </div>

    )
  }
}))

export default DrewView
