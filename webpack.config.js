var path = require('path'),
    webpack = require("webpack"),
    libPath = path.join(__dirname, 'src'),
    wwwPath = path.join(__dirname, 'dist'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CompressionPlugin = require('compression-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: path.join(libPath, '/index.js'),
  output: {
    path: path.join(wwwPath),
    filename: 'dist/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.html$/, loader: 'raw-loader'
    }, {
      test: /\.scss$/,loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /\.css$/, loader: 'style-loader!css-loader'
    },{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
      query: {
        presets: ['react','es2015']
      }
    }]
  },
  plugins: [

    new webpack.ProvidePlugin({
      'window.Masonry': 'Masonry'
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      pkg: pkg,
      template:
        path.join(libPath,
            'index.html'),
      inject:
        true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          failOnWarning: false,
          failOnError: true
        }
      }
    })
  ]
};
