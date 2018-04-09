const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const PORT = process.env.PORT || 3000;
const devConfig = merge(
  commonConfig,
  {
    // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
    target: 'electron-renderer',

    // dev only
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, "./dist"),
      compress: true,
      hot: true,
      port: PORT,
      historyApiFallback: true,
      stats: {
        colors: true,
      }
    },

    entry: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${PORT}/`,
      // dev-server: 遇到错误会重新刷新浏览器
      // only-dev-server: 遇到错误不会重新刷新浏览器，React App推荐使用。因为不会重置状态
      'webpack/hot/only-dev-server',
      './renderer/index',
    ],

    output: {
      publicPath: `http://localhost:${PORT}/`
    },

    plugins: [
      new webpack.NamedModulesPlugin(),

      // dev only
      new webpack.HotModuleReplacementPlugin(),

      new webpack.NoEmitOnErrorsPlugin(),

      // NODE_ENV should be production so that modules do not perform certain development checks
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),

      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
    ]
  }
);

module.exports = {
  devConfig,
  PORT
}
