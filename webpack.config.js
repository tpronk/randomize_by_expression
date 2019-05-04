const path = require('path');

module.exports = {
  entry: './src/rbe.js',
  output: {
    filename: 'rbe.dev.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'rbe',
    libraryExport: 'rbe',
    libraryTarget: 'window'
  },
  mode: 'development',
  optimization: {
    usedExports: true
  }
};