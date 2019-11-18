"use strict"
const exec = require('child_process').exec;
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
  }
}
