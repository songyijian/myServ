/*
 * @Description: mock数据入口文件
 * @Author: yijian.song
 * @Date: 2019-08-22 19:23:57
 * @LastEditors: 
 * @LastEditTime: 2019-08-23 20:05:15
 * -----------
 * @Description: 把mock数据通过set方法写入map里
 * @param {string} key 要比配的路由 'a/b/c'
 * @param {func} val 请求返回值(return{ body,query,method})
 *    @return: {type} 函数返回值
---------------
      .set(
          'a/b/c',
          ({ body, query, method }) => {     
            return Mock.mock({ data: {} })
          }
      )
 */


//如果用到mock语法直接引用
const Mock = require('mockjs')  
//输出map类型
var myMap = new Map()  


myMap
  .set(
    'a/b/c',
    ({ body, query, method } )=>{
      return Mock.mock(
        {
          'list|1-10': [{ 'id|+1': 1 }],
          query,
          body,
          method
        }
      )
    }
  )
  

module.exports = myMap