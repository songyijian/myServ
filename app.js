"use strict"
import fs from 'fs';
import express from 'express';
import router from './controller';


const app = express();

app.set("view engine", "ejs");

//静态服务
app.use("/jingtai", express.static(__dirname + "/0116"));


//构建
app.get('/', router.builder)


//404
app.use((req, res) => {
    res.status(404).send("404!");
})

app.listen(80)



// fn --------------------------------------
function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};