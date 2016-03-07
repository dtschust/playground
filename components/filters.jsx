import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../redux/actions.js'
import { status as statusOptions, priority as priorityOptions } from '../bug-enums'

const selectFilters = {
  priority: priorityOptions,
  status: statusOptions
}

const renderSelect = (dispatch, filterKey, filterValue) => {
  var enums = [...selectFilters[filterKey].enum].reverse()
  enums.unshift(undefined)
  return (
    <span key={filterKey} className='filter'>
      <select value={filterValue} onChange={(e) => {
        var value = e.target.value === filterKey ? undefined : e.target.value
        dispatch(updateFilter({[filterKey]: value}))
      }}>
        {enums.map((option) => {
          return (<option key={option || filterKey} value={option}>{option || filterKey}</option>)
        })}
      </select>
    </span>
  )
}

const Filters = ({filters, dispatch}) => {
  var filterNames = Object.keys(filters)
  return (
    <div className='filters'>
      <span>Filters:</span>
      {
        filterNames.map((filter) => {
          if (selectFilters[filter]) {
            return renderSelect(dispatch, filter, filters[filter])
          }
          return (
            <span key={filter} className='filter'>
              <input type='text' placeholder={filter} value={filters[filter]} onChange={(e) => {
                dispatch(updateFilter({[filter]: e.target.value}))
              }}/>
            </span>
          )
        })
      }
    </div>
  )
}

Filters.displayName = 'Filters'

Filters.propTypes = {
  dispatch: React.PropTypes.func,
  filters: React.PropTypes.object
}

export default connect(({filters}) => ({filters}))(Filters)
