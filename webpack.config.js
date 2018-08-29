module.exports = {
  entry: './js/Memo.jsx',
  output: {
    filename: './js/out.js',
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'stage-2', 'react'],
        },
      }],
  },
};
