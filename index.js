"use strict"
const http = require("http");
// const fs = require("fs");
const path = require("path");
const slash = require('slash');
const express = require("express");
const app = express();

const fs = require('fs-extra')

const queryString = require("querystring");
const getDom = require("./models/getDom.js");

const uglifyjs = require("uglify-js");
// Js 压缩 -------
// function miniFn(str) {
//   return uglifyjs.minify(str).code;
// }
// try{
//   let data=uglifyjs.minify('/Users/yjsong/D/fis/05/item/js/1.js').code
//   console.log(data);
// }catch(err){
//   console.log(err);
// }


const CleanCSS = require('clean-css');
// css 压缩 --------
// var input = 'a{font-weight:bold;}';
// var options = { /* options */ };
// var output = new CleanCSS(options).minify(input);
//
// fs.readFile('/Users/yjsong/D/fis/05/item/css/2.css', {flag: 'r+', encoding: 'utf8'},  (err, data) =>{
//   if(err) {
//     console.log( err );
//   }
//   console.log(new CleanCSS({}).minify(data).styles);
// });

// sass -------
var sass = require('node-sass');


// sass.render({
//   file: scss_filename,
//   [, options..]
// }, function(err, result) { /*...*/ });
// OR
// var result = sass.renderSync({
//   data: scss_content
//   [, options..]
// });


var itmepath='/Users/yjsong/D/fis/item_test/css/1.sass';

// var result = sass.renderSync({
//   file:'/Users/yjsong/D/fis/item_test/css/1.sass',
//   outputStyle:'compressed',
//   indentedSyntax: true
//   // outputStyle : 'compressed'
//
// });
// console.log(result,result.css.toString());


fs.readFile(itmepath, {flag: 'r+', encoding: 'utf8'},  (err, data) =>{
  if(err) {
    console.log( err );
    return
  }
  if(path.extname(itmepath) === '.sass'){
    let result = sass.renderSync({
      data: data,
      // indentedSyntax: true,
      // outputStyle:'compressed'
    });
    console.log(result.css.toString());
  }else{
    console.log(new CleanCSS({}).minify(data));
  }
});



//监听文件变化 ---------
// fs.watchFile('/Users/yjsong/D/fis/05/item/css/3.css' ,{interval: 20}, function (curr, prev) {
//   if(Date.parse(prev.ctime) == 0) {
//     console.log('文件被创建!');
//   } else if(Date.parse(curr.ctime) == 0) {
//     console.log('文件被删除!')
//   } else if(Date.parse(curr.mtime) != Date.parse(prev.mtime)) {
//     console.log('文件有修改');
//   }
// });

// fs.watch('/Users/yjsong/D/fis/05/item/css/', (eventType, filename) => {
//   console.log(`事件类型是: ${eventType}`);
//   if (filename) {
//     console.log(`提供的文件名: ${filename}`);
//   } else {
//     console.log('未提供文件名');
//   }
// });



/*fs.ensureDir(slash("E:/SVN/2017/888/12/1.text"), function(err) {
  console.log(err)

});
*/


// 文件路径处理 ----------
// console.log(path.extname("E:/SVN/2017/888/12/").length,typeof path.extname("E:/SVN/2017/888/12/"))
// console.log(slash(path.resolve('E:/SVN/2017'+"/"+'/1013/')))


// 文件不存在 ----------
// fs.access(`/Users/yjsong/D/fis`,fs.constants.R_OK | fs.constants.W_OK , err => {
// 	console.log(err)
// 	if(err){
// 		console.log("文件不存在")
// 	}else{
// 		console.log("文件存在")
// 	}
// })


// 文件权限  存在与否 ----------
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

//判断 点文件 .txt
// console.log(path.extname("ss.txt"))
// console.log(path.extname(".txt"))


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


// fs.readdir('E:/SVN/auto/2016/0921', (err, data) => {
//     if (err) { console.log(err) } else {
//         console.log(data)

//     }
// })

// let ff = path.parse('/home/user/dir/file')

// console.log(ff.ext === true)


// app.use(express.static("E:/SVN/2017/0101/"));
// app.listen(9000, (err) => {
//     if (err) {
//         console.log("本地服务的9000端口可能被占用")
//         console.error(err)
//     }
// })

/*var array = ['C:\\Users\\renke\\Desktop\\sprite\\3.png',
    'C:\\Users\\renke\\Desktop\\sprite\\1.png',
    'C:\\Users\\renke\\Desktop\\sprite\\11.png',
    'C:\\Users\\renke\\Desktop\\sprite\\12.png',
    'C:\\Users\\renke\\Desktop\\sprite\\13.png',
    'C:\\Users\\renke\\Desktop\\sprite\\2.png',
    'C:\\Users\\renke\\Desktop\\sprite\\10.png',
    'C:\\Users\\renke\\Desktop\\sprite\\4.png',
    'C:\\Users\\renke\\Desktop\\sprite\\5.png',
    'C:\\Users\\renke\\Desktop\\sprite\\6.png',
    'C:\\Users\\renke\\Desktop\\sprite\\7.png',
    'C:\\Users\\renke\\Desktop\\sprite\\8.png',
    'C:\\Users\\renke\\Desktop\\sprite\\9.png'
]

*/

// let b = []
// array.forEach((item, index) => {
//     b[index] = {
//         "index": index,
//         "path": item,
//         "bsI": path.parse(item).base.split(".")[0],
//         "bs": path.parse(item).base
//     };
// })

// let len = b.length;
// for (var i = 1; i < len; i++) {
//     let tmp = b[i];
//     for (var j = i; j > 0 && parseInt(b[j - 1].bsI) > parseInt(tmp.bsI); j--) {
//         b[j] = b[j - 1];
//     }
//     b[j] = tmp;
// }




/*function pathP(array) {
    let b = []
    array.forEach((item, index) => {
        b[index] = {
            "index": index,
            "path": item,
            "bsI": path.parse(item).base.split(".")[0],
            "bs": path.parse(item).base
        };
    })

    let len = b.length;
    for (var i = 1; i < len; i++) {
        let tmp = b[i];
        for (var j = i; j > 0 && parseInt(b[j - 1].bsI) > parseInt(tmp.bsI); j--) {
            b[j] = b[j - 1];
        }
        b[j] = tmp;
    }
    return b
}



console.log(pathP(array))*/
