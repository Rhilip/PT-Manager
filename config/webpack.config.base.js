const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const pkg = require('../package.json')

const webpackConfig = {
  node: {
    Buffer: false
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  // performance: {
  // hints: false
  // },
  optimization: {
    minimize: false
  },
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  externals: {
    jquery: '$',
    axios: 'axios',
    'axios-userscript-adapter': 'axiosGmxhrAdapter'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.less$/,
        loader: [
          'style-loader',
          'css-loader',
          'less-loader', // 将 Less 编译为 CSS
        ]
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new VueLoaderPlugin(),
    // eslint-disable-next-line new-cap
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: false,
      pkg: pkg,
      title: 'PT Manager',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../resource'), to: path.resolve(__dirname, '../dist') },
      ],
    })
  ]
}

module.exports = webpackConfig
