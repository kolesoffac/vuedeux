const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtools: 'inline-source-map',

  entry: './examples/TodoMVC/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js',
    // chunkFilename: '[id].chunk.js',
    publicPath: '/dist/',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.scss$|.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
    ],
  },

// Add template compiler functionality to runtime-only node build
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
    },
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

};
