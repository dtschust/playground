import React from 'react'
import { connect } from 'react-redux'
const People = ({people}) => {
  var names = Object.keys(people)
  return (
    <div className='people'>
      {
        names.map((person) => {
          return (
            <span className='person' style={{color: people[person]}}>
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
  people: React.PropTypes.object
}

export default connect(({people}) => ({people}))(People)
