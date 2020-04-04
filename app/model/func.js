/*
 * @Description: 公用文件
 * @Author: yijian.song
 * @Date: 2019-07-29 10:29:48
 * @LastEditors: yijian.song
 * @LastEditTime: 2020-04-04 14:30:48
 */
const fs = require('fs-extra')
const slash = require('slash')
const path = require("path")


/**
 * @Description: 简单的获取命令参数
 * @case: 
 * > node server.js --name=ajanuw --post=14
 * let a = new Argvs();
 *     a.argvsAll           // [ { name: 'ajanuw' }, { post: '14' } ]
 *     a.argvsGet('name')   // ajanuw
 *     a.argvsGet('post')   // 14
 *     a.argvsKeys()        // [ 'name', 'post' ]
 *     a.argvsHas('name')   // true
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-22 15:24:18z
 */
class Argvs {
    constructor() {
        this.argvsAll = this.argvsAll();
    }
    argvsAll() {
        return process.argv.slice(2).reduce((acc, item) => {
            item = item.split(/=/);
            const [k, v] = [item[0].replace(/-/gi, ''), item[1]];
            acc.push({
                [k]: v
            });
            return acc;
        }, [])
    }

    argvsGet(k) {
        return this.argvsAll.reduce((acc, item) =>
            acc ?
            acc :
            (k in item) ?
            acc = item[k] :
            acc, false)
    }

    argvsKeys(argvsAll) {
        if (!argvsAll) argvsAll = this.argvsAll;
        return argvsAll.reduce((acc, item) => {
            return [...acc, ...Object.keys(item)]
        }, [])
    }
    argvsHas(k) {
        return Object.is(this.argvsKeys().indexOf(k), -1) ? false : true;
    }
}


// 是否存在可读写的路径文件夹
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
    var forwardedIpsStr = req.header('x-real-ip') || req.header('x-forwarded-for')
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