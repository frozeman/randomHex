const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    randomHex: './src/index.js',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'randomHex',
    libraryTarget: 'umd',
  },
  resolve: {
    fallback: {
      crypto: false,
    },
  },
};
