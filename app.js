"use strict"
const fs = require("fs");
const express = require("express");
const app = express();
const router = require("./controller/router.js");
const builderData = require("./set.json");

app.set("view engine", "ejs");
//静态服务
app.use('/staticfile', express.static(`staticfile`));
builderData.ItemType.forEach((item, i) => {
    let www = item.id;
    item.list.forEach((it, i) => {
        app.use(`/${www}/${it.name}`, express.static(`${it.path}`, { 'index': [] }));
    })
});

//构建
app.get('/', router.buildershow);
app.post('/builder', router.builder);
//静态资源UI
app.get('/:typeid/:ckid/*', router.warehouse);
//编译
app.post('/merge', router.merge);


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