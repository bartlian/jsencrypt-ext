const path = require('path');

module.exports = {
  entry: path.join(path.resolve(__dirname, 'src'), 'index.js'),
  output: {
    library: 'JSEncrypt',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
    path: path.resolve(__dirname, 'lib'),
    filename: 'jsencrypt.js',
  },
  mode: 'development'
};