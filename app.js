"use strict"
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const opn = require("opn")
const port = 8080
const func = require("./models/func")

const routers = require("./controller/router.js")
const mockrouter = require("./mock/index.js")
const builderData = require("./set.json")


// ajax 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORF处理跨域问题
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})



// 目录静态化
let url = `http://${func.getIPAdress()}:${port}`
app.set("view engine", "ejs")
app.use('/staticfile', express.static(`staticfile`))
builderData.ItemType.forEach((item, i) => {
    let www = item.id;
    item.list.forEach((it, i) => { app.use(`/${www}/${it.id}`, express.static(`${it.path}`, { 'index': [] })) })
})



// mock交互接口
app.use('/mock', mockrouter)

// builder 功能接口
app.get('/', routers.buildershow)
app.post('/builder', (req, res, next)=>{
    if (func.getIPAdress() !== func.getClientIp(req)){
        res.send({
            "state": 0,
            "info": '只支持本地服务创建。'
        })
    }else{
        routers.builder(req, res, next)
    }
})
app.get('/:typeid/:ckid/*', routers.warehouse)
app.post('/merge', routers.merge)
app.post('/staticv', routers.staticv)


app.use((req, res) => { res.status(404).send("404!")})
app.listen(port, (err) => {
    if (err) {
      console.log(`本地${port}端口可能被占用`,err)
    }else{
      console.log('> Network ' + url )
      console.log('> Local ' + `http://localhost:${port}`)
    }
})


// 自动打开页面
opn(url) 