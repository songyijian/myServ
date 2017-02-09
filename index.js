"use strict"
const http = require("http");
const fs = require("fs");
const path = require("path");
const queryString = require("querystring");
const getDom = require("./models/getDom.js");

// fs.access(`/Users/yjsong/D/fis`,fs.constants.R_OK | fs.constants.W_OK , err => {
// 	console.log(err)
// 	if(err){
// 		console.log("文件不存在")
// 	}else{
// 		console.log("文件存在")
// 	}
// })

// fs.access(`/Users`,fs.constants.R_OK | fs.constants.W_OK , err => {
// 	console.log(err)
// 	if(err){
// 		console.log("文件不存在")
// 	}else{
// 		console.log("文件存在")

// 	}
// })



//递归 ===================
// var d = ['00', '000', '0000', '00000'];
// dg(d.length - 1)

// function dg(c) {
//     if (c === 0) {
//         console.log("ys")
//         return false;
//     }
//     c--;
//     dg(c)
//     console.log(c, d[c])
// }




//创建文件夹===================
/*__dirname + "/views/2" 创建的文件夹叫 2 
 *fs.mkdir(__dirname + "/views/2",权限 不填默认0777 读写, (err) => {})
err
错误码 -4075
然后是EEXIST
说明目录已存在
目录或者文件已存在
 */

// fs.mkdir(__dirname + "/views/2", (err) => {
//     if (err) {
//         console.log("err:", err)
//     } else {
//         console.log("yes:")
//     }
// })

// fs.mkdir('E:/SVN/2017/0123/2/imgages', (err) => {
//     if (err) {
//         console.log("err:", err)
//     } else {
//         console.log("yes:")
//     }
// })



//读取目录内容===================
/*
文件夹不存在 err
存在但下面没文件 []
 */

// fs.readdir(__dirname + "/2", (err, data) => {
//     if (err) {
//         console.log("err:", err)
//     }
//     console.log(data)
// })



//读取目录内容===================
/*
如果没有会
 */

// fs.writeFile(__dirname + "/2.txt", 'Hello Node.js', 'utf8', err => {
//     if (err) {
//         console.log("err:", err)
//     }
// })


// //爬虫 ==================
// getDom.getHtml('http://test.go.163.com/go/2017/0106/honor/index.html', (err, data) => {
//     console.log(err, data)
//     let xr = data;
//     console.log(xr)
//     fs.writeFile('E:/SVN/2017/0123/2/index.html', xr, 'utf8', err => {
//         console.log(err)
//     })
// })


//获取get请求的 url 信息
//let urls = req.url;

// var c = path.join('E:/SVN/auto/2016/0921', "./")
// console.log(c)


fs.readdir('E:/SVN/auto/2016/0921', (err, data) => {
    if (err) { console.log(err) } else {
        console.log(data)

    }
})