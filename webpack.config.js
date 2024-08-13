// webpack.config.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  // Your existing configuration...
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
    },
  },
  plugins: [
    // Other plugins...
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
