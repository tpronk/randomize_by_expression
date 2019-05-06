const path = require('path');

module.exports = {
  entry: './src/tsr.js',
  output: {
    filename: 'tsr.dev.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'tsr',
    libraryExport: 'tsr',
    libraryTarget: 'window'
  },
  mode: 'development',
  optimization: {
    usedExports: true
  }
};