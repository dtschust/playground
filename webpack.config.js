var webpack = require('webpack')
var path = require('path')
var LessPluginNpmImport = require('less-plugin-npm-import')

var config = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/public'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        'presets': ['react', 'es2015'],
        'plugins': ['transform-object-rest-spread'],
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
  lessLoader: {
    lessPlugins: [new LessPluginNpmImport()]
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
