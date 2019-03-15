var isProd = process.env.NODE_ENV === 'production',
  webpack = require('webpack'),
  path = require('path'),
  autoprefixer = require('autoprefixer'), csswring = require('csswring'),
  mqpacker = require('css-mqpacker'),
  values = require('postcss-modules-values'),
  postcss_nested = require('postcss-nested'),
  postcss_color = require('postcss-color-function'),
  package = require('./package.json')

var ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

var cssLoaders = 'style!css?modules!postcss'

const copyPlugin = new CopyWebpackPlugin([{
  from: 'app/assets',
  to: 'assets'
}])

const definePlugin = new webpack.DefinePlugin({
  'process.env.publicPath': JSON.stringify(process.env.PUBLIC_PATH || '127.0.0.1:8080')
})

function extract(loaders) {
  return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')))
}

var entry = isProd ? {
  app: './app/index.jsx',
  vendors: ['react', 'react-router'] //, 'lodash']
} : {
  app: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './app/index.jsx'
  ]
}

module.exports = {
  debug: !isProd,
  devtool: 'eval',
  entry: entry

    ,
  output: {
    path: './dist',
    filename: isProd ? '[name].[chunkhash].js' : 'app.js',
    chunkFilename: isProd ? '[chunkhash].js' : '[id].js'
  }

  ,
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loaders: (isProd ? [] : ['react-hot']).concat(['babel']),
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: isProd ? extract(cssLoaders) : cssLoaders
      }, {
        test: /\.png$/,
        loader: "url?limit=100000&mimetype=image/png"
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
      }, , {
        test: /\.gif$/,
        loader: "url?limit=100000&mimetype=image/gif"
      }, {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.jpg$/,
        loader: "file"
      }
    ]
  }

  ,
  postcss: function () {
      return [
        values, postcss_nested, postcss_color, autoprefixer, mqpacker, csswring
      ]
    }

    ,
  plugins: isProd ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', '[name].[hash].js'),
    new ExtractTextPlugin('[name].[hash].css'),
    new HtmlWebpackPlugin({
      title: package.name,
      template: './conf/tmpl.html',
      production: isProd
    }),
    copyPlugin,
    definePlugin
  ] : [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: package.name,
      template: './conf/tmpl.html'
    }),
    copyPlugin,
    definePlugin
  ],
  resolve: {
    modulesDirectories: ['app', 'node_modules'],
    extensions: ['', '.js', '.json', '.jsx', '.css']
  }
};
