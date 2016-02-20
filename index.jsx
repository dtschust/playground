import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
require('./styles/index.less')

var Index = React.createClass({
  displayName: 'Index',

  render: function () {
    return (
      <div className={classnames('index')}>Hello World</div>
    )
  }
})

ReactDOM.render(<Index/>, document.getElementById('root'))
