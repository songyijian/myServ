'use strict'

// https://juejin.im/post/5ab79fa75188255582525400

const merge = require('webpack-merge');
const path = require('path');


module.exports = {
  entry: './src/index.js', //入口文件，src下的index.js
  output: {
      path: path.join(__dirname, 'dist'), // 出口目录，dist文件
      filename: '[name].[hash].js' //这里name就是打包出来的文件名，因为是单入口，就是main，多入口下回分解
  },
  module: {
    // rules: {
    //   test: /\.css$/,
    //   use: ['style-laoder', 'css-loader'],
    //   include: path.join(__dirname, 'src'), //限制范围，提高打包速度
    //   exclude: /node_modules/
    // },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0'] // env转换es6 stage-0转es7 react转react
        }
      }
    },
    // {
    //   test: /\.css$/, // 转换文件的匹配正则
    //   // css-loader用来处理css中url的路径
    //   // style-loader可以把css文件变成style标签插入head中
    //   // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
    //   // 此插件先用css-loader处理一下css文件
    //   use: ExtractTextWebpackPlugin.extract({
    //     fallback: 'style-loader',
    //     //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
    //     use: ['css-loader', 'postcss-loader']
    //   })
    // },
  },
  plugin: {},
  devServer: {}
}
