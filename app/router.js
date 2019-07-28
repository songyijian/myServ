const express = require('express');
const router = express.Router();
const mocRouter = require("./controller/mock.js")
const handleRouter = require("./controller/handle.js")
const func = require("./model/func")
var Mock = require('mockjs');
var Random = Mock.Random;

const fs = require('fs');


function isMe(req, res, next){
    if (func.getIPAdress() !== func.getClientIp(req)) {
        res.send({ "state": 0, "info": 'err：该操作只支持本地服务' });
        return
    }
    next()
}

// 业务功能接口
router.get('/', handleRouter.renderIndex)
router.post('/creact_template_api', isMe, handleRouter.creactTemplate)


//ui静态仓库
router.get('/:urlId/*', handleRouter.warehouse)

// 模拟异步延时等待
// router.get('/mockwait', mocRouter.get) // 模拟异步延时等待
router.post('/upload', mocRouter.upload)


router.post('/creact_mock_files_api', isMe, mocRouter.creactMockFiles)


router.get('/mock', mocRouter.render)
router.get('/mock/*', function (req, res, next) {
    let { ...Npath } = req.params;
    console.log(Npath)
      var urlP = req.__CONFIG__.mockfiles + `/${Npath[0].split('/').join('~') }.js`

      try {
        fs.readFile(urlP, {
            encoding: "utf-8"
        }, function (err, fr) {
            if (err) {
                console.log('1',err);
            } else {
                console.log('yyyyy-----',fr)
                let db = JSON.parse(fr)
                Mock.setup(Number(db.tim))
                var d = Mock.mock(`/mock/${Npath[0]}`, db.type, function (params) {
                    return eval(`(${db.restxt})(params)`)
                })
                res.send(d)
            }
        })
          
      } catch (error) {
            res.send({
                status: 0,
                err: error
            })
      }

     
    // var data = Mock.mock(`/mock/${Npath[0]}`, function (params) {
    //     console.log(params)
    //     return {
    //         'list|20': [{
    //             'id|+1': 1,
    //             'serial_number|1-100': 1,
    //             'warn_number|1-100': 1,
    //             'warn_name|1': ['报警类型1', '报警类型2', '报警类型3'],
    //             'warn_level|1': ['紧急', '重要'],
    //             'warn_detail': '环境IP:10.114.123.12,服务名称:XX',
    //             'create_time': Random.datetime(),
    //             'finish_time': Random.datetime(),
    //             'contact|4': 'abc'
    //         }]
    //     }
    // });

  
})

module.exports = router;