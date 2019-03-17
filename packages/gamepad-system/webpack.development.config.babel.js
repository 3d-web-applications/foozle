const CopyPlugin = require('copy-webpack-plugin');

const folderName = __dirname.split(/[\\/]/).pop();

module.exports = {
  plugins: [
    new CopyPlugin([
      {
        from: './src/examples/data/xbox360-mapping.json',
        to: './',
        force: true
      },
      {
        from: './src/examples/data/oculus-touch-left-mapping.json',
        to: './',
        force: true
      },
    ]),
  ],
  context: __dirname,
  entry: {
    [`${folderName}.js`]: './main.js',
    'xbox360-input-example.js': './src/examples/xbox360-input-example.js',
    'xbox360-input-state-example.js': './src/examples/xbox360-input-state-example.js',
    'oculus-touch-input-left-example.js': './src/examples/oculus-touch-input-left-example.js',
    'oculus-touch-input-state-left-example.js': './src/examples/oculus-touch-input-state-left-example.js'
  },
  output: {
    filename: '[name]',
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
