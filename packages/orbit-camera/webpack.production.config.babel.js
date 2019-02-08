const folderName = __dirname.split(/[\\/]/).pop();

module.exports = {
  plugins: [],
  context: __dirname,
  entry: './main.js',
  output: {
    filename: `${folderName}.js`,
    path: `${__dirname}/dist`,
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    }],
  },
};
