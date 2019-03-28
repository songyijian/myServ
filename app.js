"use strict"
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const opn = require("opn")
const func = require("./models/func")
const configData = require("./config")
const routers = require("./router")
const { port=8080 } = configData;

//http交互
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//业务中间件
app.use(function (req, res, next) {
    req.__CONFIG__ = configData;    //项目对配置直接带过去
    res.header('Access-Control-Allow-Origin', '*') //CORF处理跨域问题
    next()
})

// 目录静态化
app.set("view engine", "ejs")
app.use('/staticfile', express.static(`staticfile`))
configData.item_type.forEach((item, i) => {
  app.use(`/${item.id}`, express.static(`${item.path}`, { 'index': [] }))
})

//router
app.use('',routers)
app.use((req, res) => { res.status(404).send("404!")})
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
// opn(url) 