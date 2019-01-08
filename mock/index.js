var express = require('express');
var router = express.Router();
// var fs = require("fs");
// var multiparty = require('multiparty');  //图片上传模块  即可以获取form表单的数据 也可以实现上传文件

// 一定要在路由上加的
router.use(require('body-parser')());


/**
 * mock/get?time=3000
 * time=返回时间（毫秒）别过长
 */
router.get('/get', (req, res, next) => {
  let rbody = req.query
  let times = !isNaN(Number(rbody.time)) ? Number(rbody.time) : 0;

  try {
    if ('jsonStr' in rbody){
      rbody.jsonStr =  JSON.parse(rbody.jsonStr)
    }
  } catch (error) {
  }

  setTimeout(() => {
    res.send({
      code: 200,
      msg: 'mock/get， 成功获取数据',
      data: rbody
    })
  }, times)
})

/**
 * mock/get?time=3000
 * time=返回时间（毫秒）别过长
 */
router.post('/post',(req, res, next)=>{
  let rbody = req.body
  let times = !isNaN(Number(rbody.time)) ? Number(rbody.time) : 0;
  setTimeout(() => {
    res.send({
      code: 200,
      msg: 'mock/post， 成功获取数据!',
      data: rbody
    })
  }, times)
})

module.exports = router;