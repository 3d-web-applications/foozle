const CopyPlugin = require('copy-webpack-plugin');

const folderName = __dirname.split(/[\\/]/).pop();

module.exports = {
  plugins: [
    new CopyPlugin([
      {
        from: './src/gamepads/xbox360-mapping.json',
        to: './',
        force: true
      },
    ]),
  ],
  context: __dirname,
  entry: {
    [`${folderName}.js`]: './main.js',
    'xbox360-input-example.js': './src/examples/xbox360-input-example.js',
    'xbox360-input-state-example.js': './src/examples/xbox360-input-state-example.js'
  },
  output: {
    filename: '[name]',
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
