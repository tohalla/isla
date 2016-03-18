const webpack = require('webpack');
const merge = require('webpack-merge');
const rucksack = require('rucksack-css');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const pkg = require('./package.json');

const PATHS = {
  entry: path.join(__dirname, 'src', 'main', 'webapp', 'index'),
  dist: path.join(__dirname, 'src', 'main', 'webapp', 'dist')
};

const common = {
  entry: PATHS.entry,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.dist,
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
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('css!sass!postcss')
      }
    ]
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ]
};

const development = merge(Object.assign(common,
  {
    devtool: 'eval',
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new ExtractTextPlugin('./assets/style/style.css', {
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        template: './src/main/webapp/templates/default.html',
        inject: 'body'
      })
    ]
  })
);

const production = merge(Object.assign(common,
  {
    devtool: 'cheap-module-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new ExtractTextPlugin('./assets/style/style.css', {
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
        inject: 'body'
      })
    ]
  }), {
    entry: {
      vendor: Object.keys(pkg.dependencies).filter(
        p => {
          return p !== 'alt-utils';
        }
      )
    }
  }
);

module.exports = process.env.NODE_ENV === 'production' ?
  production :
  development;
