/*
 * @Description: mock数据入口文件
 * @Author: yijian.song
 * @Date: 2019-08-22 19:23:57
 * @LastEditors:
 * @LastEditTime: 2019-08-29 16:07:38
 */

const Mock = require('mockjs') //如果用到mock语法直接引用
var myMap = new Map()	//输出map类型


myMap
  .set(
    'sdk/dev/',
    ({ body, query, method } )=>{
      console.log(body, query, method)
      return Mock.mock(
        {
            body, query, method
        }
      )
    }
  )


module.exports = myMap
