const path = require('path');

module.exports = {
  entry: './src/rbe.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rbe.min.js'
  },
  mode: 'production'
};