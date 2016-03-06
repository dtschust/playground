import React from 'react'
import { connect } from 'react-redux'
const People = ({people, identity}) => {
  var names = Object.keys(people)
  if (names.indexOf(identity) >= 0) {
    names.splice(names.indexOf(identity), 1)
  }
  names.unshift(identity)

  return (
    <div className='people'>
      {
        names.map((person) => {
          return (
            <span key={person} className='person' style={{color: people[person]}}>
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

export default connect(({people, identity}) => ({people, identity}))(People)
