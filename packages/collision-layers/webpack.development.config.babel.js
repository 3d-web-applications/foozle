module.exports = {
  plugins: [],
  context: __dirname,
  entry: './main.js',
  output: {
    filename: 'collision-layers.js',
    path: `${__dirname}/dist`,
  },
  devtool: 'inline-source-map',
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
