"use strict"
const fs = require("fs");
const opn = require('opn')
const express = require("express");
const app = express();
const router = require("./controller/router.js");
const builderData = require("./set.json");

const port = 9000;
let url = 'http://localhost:' + port;

app.set("view engine", "ejs");
app.use('/staticfile', express.static(`staticfile`));
builderData.ItemType.forEach((item, i) => {
    let www = item.id;
    item.list.forEach((it, i) => {
        app.use(`/${www}/${it.name}`, express.static(`${it.path}`, { 'index': [] }));
    })
});
console.log('> Listening at ' + url + '\n')
opn(url)

app.get('/', router.buildershow);
app.post('/builder', router.builder);
app.get('/:typeid/:ckid/*', router.warehouse);
app.post('/merge', router.merge);
//404
app.use((req, res) => { res.status(404).send("404!");})


app.listen(port, (err) => {
    if (err) {
        console.log("本地服务的80端口可能被占用")
        console.error(err)
    }
})
