"use strict"
var exec = require('child_process').exec
const opn = require("opn")
// const { isObj, isArray, isFunction } = require("../model/func")

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

  // 浏览器打开
  browserOpenItem: (req, res, next) => {
    try {
      let browserOpen = req.__CONFIG__.browserOpen
      let { url } = req.body
      opn(url, { app: browserOpen || 'google chrome'})
      res.send({
        state: 200,
        msg: `成功执行`
      })
    } catch (error) {
      res.send({
        state: 0,
        mag: `未知错误`,
        error
      })
    }
  },


}
