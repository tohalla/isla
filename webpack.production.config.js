const webpack = require('webpack');
const rucksack = require('rucksack-css');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const pkg = require('./package.json');

const PATHS = {
  entry: path.join(__dirname, 'src', 'main', 'webapp', 'index'),
  dist: path.join(__dirname, 'src', 'main', 'webapp', 'dist')
};

module.exports = {
  entry: {
    main: PATHS.entry,
    vendor: Object.keys(pkg.dependencies).filter(
      p => {
        return p !== 'alt-utils';
      }
    )
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(PATHS.dist, 'assets'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('css!sass!postcss')
      }
    ]
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        screw_ie8: true // eslint-disable-line
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/main/webapp/templates/default.html',
      inject: 'body',
      filename: '../index.html'
    })
  ]
};

