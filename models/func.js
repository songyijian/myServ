const fs = require('fs-extra');
const slash = require('slash');
const path = require("path")

// 是否存在可读写的路径
function isDirCallFn(url,fn){
    fs.access(url, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        err ? fn(false) : fn(true)
    })
}


// 是否存在合法文件
function isFileCallFn(url, fn) {
    fs.stat(url, function (err, stat) {
        err ? fn(false) : fn(true)
    })
}


// 是否存在合法文件
function isFileUrl(url) {
    return path.extname(slash(url)).length > 1;
}


// 获取用户ip
function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for')
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',')
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress
    }
    return ipAddress.substring(7)
}


// 获取本地
function getIPAdress() {
    var interfaces = require('os').networkInterfaces()
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


module.exports = {
    getClientIp:getClientIp,
    getIPAdress:getIPAdress,
    isDirCallFn: isDirCallFn,
    isFileCallFn: isFileCallFn,
    isFileUrl: isFileUrl
}