import React from 'react'
import { connect } from 'react-redux'
// import { fetchBugs } from '../redux/actions.js'
import Bug from './bug'
import People from './people'
import Filters from './filters'
import Sort from './sort'
import BugCreator from './bug-creator'
import {clearFocus} from '../redux/actions'
import _ from 'lodash'

const DrewView = React.createClass({
  displayName: 'Drew View',

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    bugIds: React.PropTypes.array.isRequired
  },

  unFocus: function () {
    this.props.dispatch(clearFocus())
  },

  render: function () {
    var {bugIds} = this.props

    return (
      <div className='drew-view' onClick={this.unFocus}>
        <People/>
        <h1>{window.projectName}</h1>
        <Filters/>
        <Sort/>
        <div className='bugs-container'>
          {
            bugIds.map((bugId) => {
              return (<Bug key={bugId} id={bugId}/>)
            })
          }
        </div>
        <BugCreator dispatch={this.props.dispatch}/>
      </div>

    )
  }
})

const mapStateToProps = function ({bugs, filters, sort}) {
  // filter the bugs
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

  // now sort them
  var { sortBy, sortOptions, direction } = sort
  var customSort = sortOptions[sortBy].customSort
  var inverseFactor = direction === 'desc' ? 1 : -1
  var sortedBugs
  if (customSort) {
    sortedBugs = _.sortBy(filteredBugs, (bug) => {
      return inverseFactor * customSort.indexOf(bug[sortBy])
    })
  } else {
    sortedBugs = _.orderBy(filteredBugs, sortBy, direction)
  }
  return {
    bugIds: _.map(sortedBugs, '_id'),
    filters
  }
}

export default connect(mapStateToProps)(DrewView)
