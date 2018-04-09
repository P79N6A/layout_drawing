const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const {
//   dependencies: externals
// } = require('../src/package.json');

const commonConfig = {
  // absolute path for project root
  context: path.resolve(__dirname, '../src'),

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      template: './renderer/index.html',
    })
  ],

  // externals: Object.keys(externals || {})
}

module.exports = commonConfig;
