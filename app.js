"use strict"
const fs = require("fs");
const express = require("express");
const router = require("./controller/router.js");
const app = express();
const builderData = require("./set.json");


app.set("view engine", "ejs");
//静态服务
builderData.ItemType.forEach((item, i) => {
    let www = item.name;
    item.list.forEach((item, i) => {
        app.use(`/${www}/${item.name}`, express.static(`${item.path}`));
    })
});

//构建
app.get('/', router.buildershow)
app.post('/get', router.builder)

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