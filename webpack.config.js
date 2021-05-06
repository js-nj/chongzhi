var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  externals: {
    'Vue': 'Vue',
    'vue': 'Vue',
    "ElementUI": "ElementUI",
    "VueRouter": "VueRouter",
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        postcss: [require('postcss-cssnext')({
            features: {
              rem: false
            }
          })
        ]
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize'
        })
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      'src',
      'node_modules'
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new ExtractTextPlugin({ filename: '/app.css', allChunks: true })
  ],
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true,
    host: '0.0.0.0',
    port: 8082
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.output.publicPath = './dist/';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      "WEBPACK_CONFIG_HOST": '"http://www.zhaolai.net:6012"'
      // "WEBPACK_CONFIG_HOST": 'location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)) + "/"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    })
  ])
} else if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      "WEBPACK_CONFIG_HOST": '"http://www.zhaolai.net:6012"'
    })
  ])
}
