const express = require('express');
const router = express.Router();
const mocRouter = require("./controller/mock.js")
const handleRouter = require("./controller/handle.js")
const func = require("./model/func")
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


module.exports = router;