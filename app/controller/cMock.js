/**
 * @Author: happyelements
 * @Date:   2019-08-23T20:11:50+08:00
 * @Last modified by:   happyelements
 * @Last modified time: 2020-01-21T13:24:09+08:00
 */



const { isObj, isArray, isFunction } = require("../model/func")

module.exports = {
  // 构建UI
  api: (req, res, next) => {
    try {
      var mjs = require(req.__CONFIG__.mockfiles+'/index.js')
    } catch (error) {
      console.error(error)
      throw 'mock文件引入错误'
    }
    const { body, query, method } = req
    const routers = req.params[0]  //路由
    try {
      let item = mjs.get(routers)
      if (isFunction(item)) {
        res.send(item({
          body,   //post携带参数
          query,  //get携带参数
          method  //get | post
        }))
      } else {
        res.send({
          "state": 0,
          "info": 'mock书写存在问题'
        })
      }
    } catch (error) {
      console.error(error)
      res.send({
        "state": 0,
        "info": '未知错误',
        "error": error
      })
    }
  }
}
