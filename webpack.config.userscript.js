// 编译userscript的脚本
const path = require('path')
const UserScriptMetaDataPlugin = require('userscript-metadata-webpack-plugin')

//import pkg from './package.json'
const metadata = require('./src/userscript/metadata')

module.exports = {
  node: {
    Buffer: false
  },
  entry: './src/userscript/main.ts',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.prod.user.js'
  },
  optimization: {
    minimize: false
  },
  externals: {
    jquery: '$',
    sizzle: 'Sizzle',
    localforage: 'localforage',
    'gm-storage': 'GMStorage',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new UserScriptMetaDataPlugin({
      metadata,
    }),
  ],
}
