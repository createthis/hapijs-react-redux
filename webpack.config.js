/**
 * file: webpack.config.js
 */

const path = require('path');
import SystemService from "~/services/system"
const NODE_ENV = SystemService.get_node_env();

/**
 * Export webpack configuration
 */

function build_by_entry_and_target(entry, target) {
  let output = {
    mode: NODE_ENV === 'production' ? 'production' : 'development',
    entry: ['@babel/polyfill', entry],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: target,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /node_modules\/react-bootstrap\/dist\/react-bootstrap.min.js$/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ]
    },
  }
  return output;
}

export default [
  build_by_entry_and_target('./client/index.jsx', 'bundle.js'),
]
