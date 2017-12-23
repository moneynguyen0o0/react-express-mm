const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'app.js',
    publicPath: '/assets/'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'es2017', 'react'],
            plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties']
          }
        }
      },
      {
        test: [/\.ico/, /\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.woff/, /\.woff2/, /\.eot/, /\.otf/, /\.ttf/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/assets/'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '/assets/',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('postcss-import')({ addDependencyTo: webpack }),
                    require('postcss-for'),
                    require('postcss-calc'),
                    require('postcss-url')(),
                    require('postcss-mixins'),
                    require('postcss-simple-vars'),
                    require('postcss-nested'),
                    require('precss')(),
                    require('autoprefixer')()
                  ];
                }
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.css'
    })
  ],
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
};
