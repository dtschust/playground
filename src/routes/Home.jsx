/* eslint-disable camelcase */
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const Home = React.createClass({
  displayName: 'Home',
  propTypes: {
    push: React.PropTypes.func.isRequired
  },
  nextRoute: function (e) {
    e.preventDefault()
    this.props.push('/')
  },
  render: function () {
    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.nextRoute}>Go to other route</button>
      </div>
    )
  }
})

const mapStateToProps = (store) => {
  return {

  }
}

const mapDispatchToProps = { push }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
/* eslint-enable camelcase */
