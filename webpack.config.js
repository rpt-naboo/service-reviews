var webpack = require('webpack');
var path = require('path');

var SOURCE_DIR = path.resolve(__dirname, 'client/src');
var END_DIR = path.resolve(__dirname, 'client/dist');

var config = {
  entry: SOURCE_DIR + '/index.jsx',
  output: {
    path: END_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: SOURCE_DIR,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

module.exports = config;