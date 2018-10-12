"use strict"
const express = require("express");
const app = express();
const routers = require("./controller/router.js");
const mockrouter = require("./mock/index.js");
const builderData = require("./set.json");
const opn = require("opn");
const port = 8080;


// ajax 中间件
app.use(require('body-parser')());


// 获取本地
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

//CORF处理跨域问题
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
// 目录静态化
let url = `http://${getIPAdress()}:${port}`;
app.set("view engine", "ejs");
app.use('/staticfile', express.static(`staticfile`));
builderData.ItemType.forEach((item, i) => {
    let www = item.id;
    item.list.forEach((it, i) => { app.use(`/${www}/${it.id}`, express.static(`${it.path}`, { 'index': [] })) })
});
opn(url) // 自动打开页面

// mock交互接口
app.use('/mock', mockrouter);



// builder 功能接口
app.get('/', routers.buildershow);
app.post('/builder', routers.builder);
app.get('/:typeid/:ckid/*', routers.warehouse);
app.post('/merge', routers.merge);
app.post('/staticv', routers.staticv);




app.use((req, res) => { res.status(404).send("404!")})
app.listen(port, (err) => {
    if (err) {
        console.log(`本地${port}端口可能被占用`,err)
    }else{
      console.log('> Listening at ' + url + '\n')
    }
})
