import React from 'react'
import { connect } from 'react-redux'
const People = ({people}) => {
  if (!people[0]) {
    return <span/>
  }
  return (
    <div className='people'>
      {
        people.map((person) => {
          return (
            <span key={person} className='person' style={{color: 'orange'}}>
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
