const nodeExternals = require('webpack-node-externals');
const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, 'server/src');
const END_DIR = path.resolve(__dirname, 'server/dist');

const config = {
  target: "node",
  entry: SOURCE_DIR + '/index.js',
  output: {
    path: END_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: SOURCE_DIR,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  externals: [nodeExternals()],
};

module.exports = config;