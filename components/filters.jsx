import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../redux/actions.js'

const Filters = ({filters, dispatch}) => {
  var filterNames = Object.keys(filters)
  return (
    <div className='filters'>
      <h3>Filters</h3>
      {
        filterNames.map((filter) => {
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
