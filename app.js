"use strict"
const fs = require("fs");
const express = require("express");
const app = express();
//const serveStatic = require('./node_modules/express/node_modules/serve-static')
const router = require("./controller/router.js");
const builderData = require("./set.json");

app.set("view engine", "ejs");
//静态服务
builderData.ItemType.forEach((item, i) => {
    let www = item.id;
    item.list.forEach((it, i) => {
        app.use(`/${www}/${it.name}`, express.static(`${it.path}`, { 'index': [] }));
    })
});

//构建
app.get('/', router.buildershow)
app.post('/get', router.builder);
//静态资源UI
app.get('/:typeid/:ckid/*', router.warehouse)


//404
app.use((req, res) => {
    res.status(404).send("404!");
})

app.listen(8000, (err) => {
    if (err) {
        console.log("本地服务的80端口可能被占用")
        console.error(err)
    }
})