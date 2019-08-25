/**
 * file: webpack.config.js
 */

const path = require('path');

/**
 * Export webpack configuration
 */

function build_by_entry_and_target(entry, target) {
  let output = {
    entry: ['@babel/polyfill', entry],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: target,
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
  }
  return output;
}

export default [
  build_by_entry_and_target('./client/index.jsx', 'bundle.js'),
]
