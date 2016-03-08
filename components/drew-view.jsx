import React from 'react'
import { connect } from 'react-redux'
// import { fetchBugs } from '../redux/actions.js'
import Bug from './bug'
import People from './people'
import Filters from './filters'
import Sort from './sort'
import BugCreator from './bug-creator'
import _ from 'lodash'

const DrewView = React.createClass({
  displayName: 'Drew View',

  propTypes: {
    bugIds: React.PropTypes.array.isRequired,
    projectName: React.PropTypes.string
  },

  render: function () {
    var {bugIds, projectName} = this.props

    return (
      <div className='drew-view'>
        <People/>
        <h1>Project: {projectName}</h1>
        <Filters/>
        <Sort/>
        <div className='bugs-container'>
          {
            bugIds.map((bugId) => {
              return (<Bug key={bugId} id={bugId}/>)
            })
          }
        </div>
        <BugCreator/>
      </div>

    )
  }
})

const mapStateToProps = function ({bugs, filters, sort, projectName}) {
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
    projectName,
    filters
  }
}

export default connect(mapStateToProps)(DrewView)
