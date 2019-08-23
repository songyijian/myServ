/*
 * @Description: 公用文件
 * @Author: yijian.song
 * @Date: 2019-07-29 10:29:48
 * @LastEditors: 
 * @LastEditTime: 2019-08-23 20:07:33
 */
const fs = require('fs-extra')
const slash = require('slash')
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


//是否Map对象
function isMap(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Map'
}
//是否对象
function isObj(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}

//是否数组
function isArray(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}

//是否函数
function isFunction(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}

module.exports = {
    getClientIp,
    getIPAdress,
    isDirCallFn,
    isFileCallFn,
    isFileUrl,
    isMap, isObj, isArray, isFunction
}