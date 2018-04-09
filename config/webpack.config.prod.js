/**
 * Build config for electron 'Renderer Process' file
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer',

  devtool: 'cheap-module-source-map',

  entry: [
    './renderer/index'
  ],

  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '../dist/'
  },

  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    new webpack.optimize.OccurrenceOrderPlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new ExtractTextPlugin('style.css'),
  ],
});
