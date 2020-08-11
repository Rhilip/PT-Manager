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
    axios: 'axios',
    'axios-userscript-adapter': 'axiosGmxhrAdapter',
    'gm-storage': 'GMStorage'
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
    ]
  },
  plugins: [
    new UserScriptMetaDataPlugin({
      metadata,
    }),
  ],
}