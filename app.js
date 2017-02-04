"use strict"
const fs = require("fs");
const express = require("express");
const router = require("./controller/router.js");
const app = express();



app.set("view engine", "ejs");
//静态服务
app.use("/jingtai", express.static(__dirname + "/2017"));

//构建
app.get('/', router.buildershow)
app.post('/get', router.builder)

//404
app.use((req, res) => {
    res.status(404).send("404!");
})

app.listen(80)

