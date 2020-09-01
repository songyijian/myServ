/*
 * @Description: mock数据入口文件
 * @Author: yijian.song
 * @Date: 2019-08-22 19:23:57
 * @LastEditors: yijian.song
 * @LastEditTime: 2020-07-17 15:34:07
 */
const Mock = require('mockjs') //如果用到mock语法直接引用
const Random = Mock.Random

module.exports = new Map()
  .set(
    'sdk/dev',
    ({
      body,
      query,
      method
    }) => {
      console.log(body, query, method)
      return Mock.mock({
        body,
        query,
        method
      })
    }
  )
  .set('dsp/advertiser/list/', ({
    body,
    query,
    method
  }) => {
    return Mock.mock({
      "code": 200,
      "msg": "",
      "data": {
        "data|5-15": [{
          a: 1
        }],
        "page": [1, 1, 1, 10, 1]
      }
    })
  })
  .set(
    'common/log/project_list',
    ({
      body,
      query,
      method
    }) => {
      return {
        "code": 200,
        "msg": "",
        "data": [{
            "id": 1,
            "name": "单元管理",
            "method": {
              "create":'创建',
              "update":'geng新',
              "delete":'删除。。。'
            },
            "enable": [
              {
                "name": "操作账号",
                "key": "username",
                "type": "text"
              },
              {
                "name": "应用ID",
                "key": "appid",
                "type": "text"
              },
              {
                "name": "广告单元",
                "key": "placementid",
                "type": "text"
              },
              {
                "name": "广告类型",
                "key": "adtype",
                "type": "option",
                "content": [{
                    "key": 1,
                    "name": "激励视频"
                  },
                  {
                    "key": 4,
                    "name": "全屏"
                  }
                ]
              }
            ]
          },
          {
            "id": 2,
            "name": "单元管理2",
            "method": {
              "create":'创建',
              "update":'geng新',
              "delete":'删除。。。'
            },
            "enable": [
              {
                "name": "操作账号",
                "key": "username",
                "type": "text"
              },{
                "name": "应用ID",
                "key": "appid",
                "type": "text"
              },
              {
                "name": "广告类型",
                "key": "adtype",
                "type": "option",
                "content": [{
                    "key": '1',
                    "name": "激励视频"
                  },
                  {
                    "key": '4',
                    "name": "全屏"
                  }
                ]
              }
            ]
          }
        ]
      }

    }
  )
  .set(
    'ssp/log/list',
    ({
      body,
      query,
      method
    }) => {
      return Mock.mock( {
        "code": 200,
        "msg": "",
        "data": {
          "data|3-10":[{
            "username": "12121323@simgob.com",
            "project": "单元管理",
            "method|1": ['update','delete','create'],
            "uptime": "2020-07-07 12:12:12",
            "changes": "变更内容",
            "context": '{"array": ["Hello","Mock.js","!","Hello","Mock.js","!","Hello","Mock.js","!","Hello","Mock.js","!","Hello","Mock.js","!","Hello","Mock.js","!","Hello","Mock.js","!","Hello","Mock.js","!","Hello","Mock.js","!"]}' 
          }],
          pages:[136144, 1, 13615, 10, 1]
        }
      })

    }
  )