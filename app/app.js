"use strict"
const express = require("express")
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const opn = require("opn")
const routers = require("./router")
const func = require("./model/func")
const configData = require("./config")
const { port=8080 } = configData

//业务中间件
app.use(function (req, res, next) {
  req.__CONFIG__ = configData;    //项目对配置直接带过去
  res.header('Access-Control-Allow-Origin', '*') //CORF处理跨域问题
  next()
})

//模版
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// 目录静态化
app.use('', express.static(__dirname + '/public'));
if (configData.uploadFiles) {
  configData.item_type.push({
    name: '上传文件',
    id: 'uploadFiles',
    path: configData.uploadFiles
  })
}
configData.item_type.forEach((item, i) => {
  app.use(`/${item.id}`, express.static(`${item.path}`, {
    'index': []
  }))
})

//http交互
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//router
app.use(routers)
app.use((req, res) => { res.status(404).render('err', { err: "404"})})

let url = `http://${func.getIPAdress()}:${port}`
app.listen(port, (err) => {
    if (err) {
      console.log(`本地${port}端口可能被占用`,err)
    }else{
      console.log('> Network ' + url )
      console.log('> Local ' + `http://localhost:${port}`)
    }
})

// 自动打开页面
configData.opn &&  opn(url)
