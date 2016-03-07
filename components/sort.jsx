import React from 'react'
import { connect } from 'react-redux'
import { updateSort } from '../redux/actions.js'
import classnames from 'classnames'

const Sort = ({sort, dispatch}) => {
  var sortOptions = Object.keys(sort.sortOptions)
  var {sortBy, direction} = sort
  return (
    <div className='sort'>
      <h3>Sort</h3>
      {
        sortOptions.map((optionKey) => {
          var option = sort.sortOptions[optionKey]
          var directionClass = ''
          if (optionKey === sortBy) {
            directionClass = direction
          }
          return (
            <span key={optionKey}
              className={classnames('sort-option', {active: optionKey === sortBy}, directionClass)}
              onClick={(e) => {
                var newSortBy = optionKey
                var newDirection = option.defaultDirection
                if (newSortBy === sortBy) {
                  newDirection = direction === 'asc' ? 'desc' : 'asc'
                }
                dispatch(updateSort({sortBy: newSortBy, direction: newDirection}))
              }}>
              {option.displayName}
            </span>
          )
        })
      }
    </div>
  )
}

Sort.displayName = 'Sort'

Sort.propTypes = {
  dispatch: React.PropTypes.func,
  sort: React.PropTypes.object
}

export default connect(({sort}) => ({sort}))(Sort)
