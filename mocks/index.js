/*
 * @Description: mock数据入口文件
 * @Author: yijian.song
 * @Date: 2019-08-22 19:23:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-09 20:14:46
 */
const { mergeMap } = require("../server/func/tools.js");
// const Mock = require("mockjs"); //如果用到mock语法直接引用
// const Random = Mock.Random;

const myMock = new Map().set("test/", () => {
  return { data: "This is my mock server !!" };
});

const opayConfig = require("./opay");

module.exports = mergeMap(myMock, opayConfig);
