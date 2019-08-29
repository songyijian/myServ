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
    'dsp/targetpack/targetpacklist',
    ({ body, query, method } )=>{
      console.log(body, query, method)
      return Mock.mock(
        {
          "msg": "",
          "code": 200,
          "data": {
            "content|5-20": [{
              // 人群定向包名称
              "name": "侠客行",
              // 人群定向包ID
              "id|+1": 1,
              // 人群定向包开关 1:开 0:关
              "state|0-1": 1,
              // 人群定向包状态 1:未生效 2:生效中 3:已失效
              "status|1-3": 2,
              // 人群定向包类型 1:规则人群包
              "type": 1,
              // 更新时间
              "uptime": "2019-07-19 18:00:22",
              // 目标人群类型 1:广告计划
              "targets": 1,
              // 匹配用户数量
              "matchusers|0-50": 0,
              // 使用数量
              "used|0-5": 0,
            }],
            "page": [ 32, 1, 7, 5, 1],
            body, query, method
          }
        }
      )
    }
  )
  .set(
    'dsp/targetpack/delete',
    ({ body, query, method } )=>{
      console.log(body, query, method)
      return Mock.mock(
        {
          "msg": "",
          "code": 200,
          "msg":'成功',
          "data": {
            body, query, method
          }
        }
      )
    }
  )
  .set(
    'dsp/targetpack/recover',
    ({ body, query, method } )=>{
      console.log(body, query, method)
      return Mock.mock(
        {
          "msg": "",
          "code": 200,
          "msg":'成功',
          "data": {
            body, query, method
          }
        }
      )
    }
  )
  .set(
    'dsp/targetpack/retrieve',
    ({ body, query, method } )=>{
      console.log(body, query, method)
      return Mock.mock(
        {
        "msg": "",
        "code": 200,
        "data": {
            // 人群定向包名称
            "name": "侠客行",
            // 人群定向包ID
            "id|1-20": 1,
            // 目标人群类型 1:广告计划
            "targets": 1,
            // 用户行为：0，不限，1，自定义
            "userbehavior|0-1": 1,
            // 用户行为-点击：0，关，1，开
            "userclick": 1,
            // 用户行为-激活：0，关，1，开
            "useractivate": 1,
            // 用户行为点击-最大值
            "userclick_max|4-6": 5,
            // 用户行为点击-最小值
            "userclick_min|1-3": 2,
            // 用户行为激活-最大值
            "useractivate_max|4-6": 5,
            // 用户行为激活-最小值
            "useractivate_min|1-3": 2,
            // 运算规则：1，交集，2，并集，3，排除
            "arithmeticrule": 1,
            // 追溯周期 单位：天
            "traceperiod": 10,
            // 已被选中的广告计划
            "campaigns": [
              {
                // 广告计划名称
                "name": "侠客行",
                // 广告计划ID
                "id": 12786,
                // 广告计划状态 1:开启 0:关闭
                "state": 1,
                // 广告计划投放状态 10:草稿 11:审核中 12:审核不过 13:审核通过 20:计划未开始 21:投放中 22:计划到期 23:日预算超限 24:总预算超限 25:账户余额不足 26:暂停 27:日曝光超限 30:已删除 31:被下线
                "adstate": 13,
                // 创意列表
                "creative": [
                    {
                        // 创意名称
                        "name": "仙御九州",

                        // 创意ID
                        "id": 1,

                        // 创意开关 0:关闭 1:开启
                        "state": 1
                    },{
                        // 创意名称
                        "name": "仙御九州",

                        // 创意ID
                        "id": 1,

                        // 创意开关 0:关闭 1:开启
                        "state": 1
                    }
                ]
              },
            ]
          }
        }

      )
    }
  )
  .set(
    'dsp/targetpack/used',
    ({ body, query, method } )=>{
      console.log(body, query, method)
      return Mock.mock(
        {
          "msg": "",
          "code": 200,
          "data|10-50": [
            {
                // 广告计划名称
                "name": "侠客行",

                // 广告计划ID
                "id": 10320,
            },
            {
                // 广告计划名称
                "name": "侠客不行",

                // 广告计划ID
                "id": 10321,
            }
          ]
        }
      )
    }
  )
  .set(
    'dsp/targetpack/update',
    ({ body, query, method } )=>{
      console.log(body, query, method)
      return Mock.mock(
        {"msg": "", "code": 200, "data": null,
        body, query, method
        }
      )
    }
  )
  .set(
    'dsp/targetpack/switch',
    ({ body, query, method } )=>{
      console.log(body, query, method)
      return Mock.mock(
        {"msg": "", "code": 200, "data": null,
        body, query, method
        }
      )
    }
  )
  .set(
    'mtest',
    ({ body, query, method } )=>{
      console.log(body, query, method)
      return Mock.mock(
        {"msg": "000", "code": 200, "data": null,
        }
      )
    }
  )


module.exports = myMap
