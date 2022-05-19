/*
 * @Description:
 * @Author: yijian.song
 * @Version:
 * @Date: 2020-04-01 10:24:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-09 20:16:16
 */

const { isFunction } = require("../func");

module.exports = {
  // 构建UI
  api: (req, res, next) => {
    try {
      var mjs = require(req.__CONFIG__.mockfiles + "/index.js");
    } catch (error) {
      console.error(error);
      throw "mock文件引入错误";
    }
    const { body, query, method } = req;
    const routers = req.params[0]; //路由
    try {
      let item = mjs.get(routers);
      if (isFunction(item)) {
        res.send(
          item({
            body, //post携带参数
            query, //get携带参数
            method //get | post
          })
        );
      } else {
        res.send({
          state: 0,
          info: "mock 存在格式错误！！"
        });
      }
    } catch (error) {
      console.error(error);
      res.send({
        state: 0,
        info: "未知错误",
        error: error
      });
    }
  }
};
