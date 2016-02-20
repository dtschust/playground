var webpack = require('webpack')
var path = require('path')

var config = {
  devtool: 'eval',
  entry: [
    path.join(__dirname, '/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        'presets': ['react', 'es2015'],
        'env': {
          'development': {
            'plugins': [['react-transform', {
              'transforms': [{
                'transform': 'react-transform-hmr',
                'imports': ['react'],
                'locals': ['module']
              }]
            }]]
          }
        }
      }
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.less']
  },
  devServer: {
    port: 3000,
    contentBase: 'public/'
  }
}

module.exports = config
