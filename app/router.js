const express = require('express');
const router = express.Router();
const fs = require('fs');
const uploadRouter = require("./controller/upload.js")
const handleRouter = require("./controller/handle.js")
const func = require("./model/func")
// var Mock = require('mockjs');
// var Random = Mock.Random;


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

// 文件上传
router.post('/upload', uploadRouter.upload)

module.exports = router;
