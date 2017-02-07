"use strict"
// const fs = require("fs");


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
//递归
var d = ['00', '000', '0000', '00000'];
dg(d.length - 1)

function dg(c) {
    if (c === 0) {
        console.log("ys")
        return false;
    }
    c--;
    dg(c)
    console.log(c, d[c])
}