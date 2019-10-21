"use strict"
const exec = require('child_process').exec;
const webpack = require("webpack");
const path = require("path");


module.exports = {
  // ide打开项目
  ideOpenItem: (req, res, next) => {
    let { url } = req.body
    let IDEOpen = req.__CONFIG__.IDEOpen
    let shellStr = IDEOpen.replace('${}', url)

    exec(shellStr, (error, stdout, stderror) => {
      if (error) {
        res.send({
          state: 0,
          mag: `未知错误`,
          error
        })
        return;
      }
      res.send({
        state: 200,
        msg: `成功执行：${shellStr}`
      })
    })
  },


  webpackFn:(req, res, next)=>{
    let { url } = req.body;

    const loaders = {
      webpack,
      ExtractTextWebpackPlugin: require('extract-text-webpack-plugin'), //css抽离
      HtmlWebPackPlugin: require("html-webpack-plugin"),  //生成html
      autoprefixer: require("autoprefixer"),        //
      CleanWebpackPlugin: require('clean-webpack-plugin').CleanWebpackPlugin, //清理掉之前的打包文件
      PurifyCSSPlugin:require('purifycss-webpack'),    //清理无用都css
      glob:require('glob'),
      ParallelUglifyPlugin:require('webpack-parallel-uglify-plugin'),
      // MiniCssExtractPlugin : require('mini-css-extract-plugin')
    }

    let webpackConfig = require(url)(loaders);

    const compiler = webpack(webpackConfig);
    compiler.run((error, stats) => {
      console.log(stats.toJson("minimal"))
      if (error || stats.hasErrors()) {
        res.send({
          state: 0,
          mag: `webpack -config ：${url}`,
          error:stats.toJson("minimal")
        })
        return
      }else{
        res.send({
          state: 200,
          msg: `webpack -config ：${url}`
        })
      }
    })



  }

}
