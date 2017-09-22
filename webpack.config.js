/**
 * file: webpack.config.js
 */

const path = require('path');

/**
 * Export webpack configuration
 */
module.exports = {
  entry: ['babel-polyfill', './client/index.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /node_modules\/react-bootstrap\/dist\/react-bootstrap.min.js$/,
        loader: 'babel-loader',
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
};
