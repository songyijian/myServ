/*
 * @Description: mock数据入口文件
 * @Author: yijian.song
 * @Date: 2019-08-22 19:23:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-12 11:20:16
 */
const Mock = require('mockjs') //如果用到mock语法直接引用
const Random = Mock.Random

module.exports = new Map()
  .set(
    'sdk/dev',
    ({ body, query, method } )=>{
      console.log(body, query, method)
      return Mock.mock(
        {
            body, query, method
        }
      )
    }
  )
  .set('dsp/advertiser/list/',({ body, query, method } )=>{
    return Mock.mock({
      "code":200,
      "msg":"",
      "data":{
          "data|5-15":[
          ],
          "page":[1,1,1,10,1]
      }
    })
  })
  .set(
    'common/usersetting/getUserSetting/',
    ({ body, query, method } )=>{
      // console.log(query.key=='AdPlan')
    }
  )
