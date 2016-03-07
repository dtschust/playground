import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
const People = ({people}) => {
  if (!people[0]) {
    return <span/>
  }
  return (
    <div className='people-container'>
      <span>Currently Connected:</span>
      {
        people.map((person, i) => {
          return (
            <span key={person}
              className={classnames('people-container__person', 'color' + i)}>
              {person}
            </span>
          )
        })
      }
    </div>
  )
}

People.displayName = 'People'

People.propTypes = {
  people: React.PropTypes.array
}

export default connect(({people}) => ({people}))(People)
