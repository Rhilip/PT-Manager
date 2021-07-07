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
    axios: 'axios',
    localforage: 'localforage',
    'axios-userscript-adapter': 'axiosGmxhrAdapter',
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
      },
      {
        test: require.resolve('./src/userscript/globals.js'),
        use: 'exports-loader?type=commonjs&exports=axios',
      }
    ]
  },
  plugins: [
    new UserScriptMetaDataPlugin({
      metadata,
    }),
  ],
}
