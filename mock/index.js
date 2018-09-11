var express = require('express');
var router = express.Router();
var fs = require("fs");
// var multiparty = require("multiparty");
var multiparty = require('multiparty');  //图片上传模块  即可以获取form表单的数据 也可以实现上传文件

// 在这个对象下面增加，最后一定要导出
module.exports = router;


//test 测试一下有没有走通
router.get('/test',(req, res, next)=>{
  res.send('mocktest 接口是通的')
})



router.post('/upfile',(req, res, next)=>{
    // //获取表单的数据 以及post过来的图片
    // var form = new multiparty.Form();
    // form.uploadDir=__dirname+'../upload_box';   //上传图片保存的目录  目录必须存在
    //
    // form.parse(req, function(err, fields, files) {
    //     //获取提交的数据以及图片上传成功返回的图片信息
    //     console.log(fields);  //获取表单的数据
    //     console.log(files);  //图片上传成功返回的信息
    //     // var username=fields.username[0];   //表单字段获取
    //     // var pic=files.pic[0].path;   //获取文件保存的目录
    //     res.send(JSON.stringify(fields))
    //
    // })


        // var form = new multiparty.IncomingForm({
        //     encoding:"utf-8",
        //     uploadDir:_dirname+'../upload_box',  //文件上传地址
        //     keepExtensions:true  //保留后缀
        // });
        //
        // form.parse(req, function(err, fields, files) {
        //     var obj ={};
        //     Object.keys(fields).forEach(function(name) {  //文本
        //         console.log('name:' + name+";filed:"+fields[name]);
        //         obj[name] = fields[name];
        //     });
        //
        //     Object.keys(files).forEach(function(name) {  //文件
        //         console.log('name:' + name+";file:"+files[name].path);
        //         obj[name] = files[name];
        //     });
        //
        //     res.send(err,obj);
        // })

        //生成multiparty对象，并配置上传目标路径
        var form = new multiparty.Form({uploadDir: '../upload_box'});
        //上传完成后处理
        form.parse(req, function(err, fields, files){
            // var inputFile = files.file[0];
            // var uploadedPath = inputFile.path;
            // var dstPath = './upload_box/' + inputFile.originalFilename;
            //
            // fs.rename(uploadedPath, dstPath, function(err) {
            //     if(err){
            //         console.log('rename error: ' + err);
            //     } else {
            //         console.log('rename ok');
            //     }
            // });
            // files.file.path = dstPath;
            // var data = files;

            res.send(fields);
        });
})
