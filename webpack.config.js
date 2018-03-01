/**
 * Created by www.Alga.me on 1/3/18.
 */
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  node: {
    fs: 'empty',
    tls: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: `${__dirname}/dist`
  },
  plugins: [
    // new CopyWebpackPlugin([{
    //   from: `./bot-env.${stage}.json`,
    //   to: 'config.json',
    //   toType: 'file'}
    // ])
  ]
};
