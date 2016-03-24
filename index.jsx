import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

require('./styles/index.less')

var Foo = React.createClass({
  propTypes: {
    bugTrackerURL: React.PropTypes.string,
    newBugEndpoint: React.PropTypes.string.isRequired,
    projectName: React.PropTypes.string.isRequired,
    reinitStore: React.PropTypes.func
  },
  getDefaultProps: function () {
    return {
      bugTrackerURL: '//drewschuster-0.nerdwallet.biz',
      reInitStore: function () {},
      newBugEndpoint: '/api/bugs'
    }
  },
  render: function () {
    debugger
    return <span/>
  }
})
var Index = React.createClass({
  displayName: 'Index',

  render: function () {
    return (
      <div className={classnames('index')}>Hello World
        <Foo projectName='drew'/>
      </div>
    )
  }
})


ReactDOM.render(<Index/>, document.getElementById('root'))
