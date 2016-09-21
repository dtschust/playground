import React from 'react'
import { connect } from 'react-redux'
import { fakeAction } from '../redux/actions'
import { push } from 'react-router-redux'

const Foo = React.createClass({
  displayName: 'Foo',
  propTypes: {
    fakeAction: React.PropTypes.func.isRequired,
    push: React.PropTypes.func.isRequired
  },
  nextRoute: function (e) {
    e.preventDefault()
    this.props.push('/home')
  },
  render: function () {
    return (
      <div>
        <h1>Foo</h1>
        <button onClick={this.nextRoute}>Go to other route</button>
      </div>
    )
  }
})

const mapStateToProps = (store) => {
  return {

  }
}

const mapDispatchToProps = { fakeAction, push }
export default connect(mapStateToProps, mapDispatchToProps)(Foo)
