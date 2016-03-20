const webpack = require('webpack');
const rucksack = require('rucksack-css');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const PATHS = {
  entry: path.join(__dirname, 'src', 'main', 'webapp', 'index'),
  dist: path.join(__dirname, 'src', 'main', 'webapp', 'dist')
};

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    PATHS.entry
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(PATHS.dist),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
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
  devtool: 'eval',
  devServer: {
    contentBase: './src/main/webapp/dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ExtractTextPlugin('style/style.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './src/main/webapp/templates/default.html',
      inject: 'body',
      filename: './index.html'
    })
  ]
};

