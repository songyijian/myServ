"use strict"
const fs = require("fs");
const opn = require('opn')
const express = require("express");
const app = express();
const router = require("./controller/router.js");
const mockIndex = require("./mock/index.js");

const builderData = require("./set.json");
const port = 8080;

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

let url = `http://${getIPAdress()}:${port}`;
app.set("view engine", "ejs");
app.use('/staticfile', express.static(`staticfile`));
builderData.ItemType.forEach((item, i) => {
    let www = item.id;
    item.list.forEach((it, i) => {
        app.use(`/${www}/${it.id}`, express.static(`${it.path}`, { 'index': [] }));
    })
});
opn(url)



app.get('/', router.buildershow);
app.post('/builder', router.builder);
app.get('/:typeid/:ckid/*', router.warehouse);
app.post('/merge', router.merge);
app.post('/staticv', router.staticv);
app.get('/mock', mockIndex.test);



app.use((req, res) => { res.status(404).send("404!");})
app.listen(port, (err) => {
    if (err) {
        console.log(`本地${port}端口可能被占用`,err)
    }else{
      console.log('> Listening at ' + url + '\n')
    }
})
