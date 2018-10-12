var express = require('express');
var router = express.Router();
// var fs = require("fs");
// var multiparty = require('multiparty');  //图片上传模块  即可以获取form表单的数据 也可以实现上传文件

// 一定要在路由上加的
router.use(require('body-parser')());

router.get('/get',(req, res, next)=>{
  console.log('mock/get， 获取的参数：', req.query)
  res.send({
    code: 200,
    msg: 'mock/get， 成功获取数据',
    data: req.query
  })
})


router.post('/post',(req, res, next)=>{
  console.log("mock/post， 获取的参数：", req.body);
  res.send({
    code: 200,
    msg:'mock/post， 成功获取数据!',
    data: req.body
  })
})

module.exports = router;