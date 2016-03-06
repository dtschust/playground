import React from 'react'
import { connect } from 'react-redux'
// import { fetchBugs, createBug } from '../redux/actions.js'
import Bug from './bug'
import People from './people'
import Filters from './filters'
import _ from 'lodash'

const DrewView = React.createClass({
  displayName: 'Drew View',

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    bugIds: React.PropTypes.array.isRequired
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
    var {bugIds} = this.props

    // people component
    // sortby component
    // filters component
    // list of bugs
    // bug creator
    return (
      <div>
        <People/>
        <Filters/>
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
})

const mapStateToProps = function ({bugs, filters}) {
  var filteredBugs = _.toArray(bugs)
  var filterNames = Object.keys(filters)
  filterNames.forEach((filter) => {
    if (!filters[filter]) {
      return
    }
    filteredBugs = filteredBugs.filter((bug) => {
      var bugVal = bug[filter].toString().toLowerCase()
      var filterVal = filters[filter].toString().toLowerCase()
      return (bugVal.indexOf(filterVal) >= 0)
    })
  })
  return {
    bugIds: _.map(filteredBugs, '_id'),
    filters
  }
}

export default connect(mapStateToProps)(DrewView)
