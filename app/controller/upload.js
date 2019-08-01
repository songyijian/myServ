const multiparty = require('multiparty')
const fs = require('fs-extra')
const util = require('util')

module.exports = {
  // 文件上传
  "upload": (req, res, next) => {
    try {
      let dirsrc = req.__CONFIG__.uploadFiles;

      // 解析一个文件上传
      var form = new multiparty.Form();
      //设置编辑
      form.encoding = 'utf-8';
      //设置文件存储路径
      form.uploadDir = dirsrc;
      //设置单文件大小限制 
      // form.maxFilesSize = 2 * 1024 * 1024;
      //form.maxFields = 1000;  设置所以文件的大小总和
      form.parse(req, function (err, fields, files) {
        console.log(1)
        console.log(files.originalFilename);
        // console.log(files.path);
        //同步重命名文件名
        // fs.renameSync(files.path, files.originalFilename);
        // res.send(util.inspect({ fields: fields, files: files }));
          res.send({
          code: 200,
          msg: '文件上传成功',
          // data: dataRes
        })

      });


      // var dataRes = { file: [], field:[]}
      // var count= 0

      // let form = new multiparty.Form({
      //   uploadDir: dirsrc // 存储目录
      // })

      // form.parse(req)

      // form.on('error', function (err) {
      //   console.log('Error: ' + err.stack);
      // });

      // // 解析表单时会发出部分
      // form.on('part', function (part) {

      //   // 非文件
      //   if (!part.filename) {
      //     console.log('参数:'  + part.name);
      //     part.resume();
      //   }

      //   // 文件
      //   if (part.filename) {
      //     count++;
      //     console.log('文件 :' + part.name, part.filename);
      //     part.resume();
      //   }

      //   part.on('error', function (err) {
      //     res.send({
      //       code: 0,
      //       msg: '未知错误查看err!',
      //       error: err
      //     })
      //   })

      // })

      // // 完成
      // form.on('close', function () {
      //   console.log(count)
      //   res.send({
      //     code: 200,
      //     msg: '文件上传成功',
      //     // data: dataRes
      //   })
      // })


      form.on('file', (name, file, ...rest) => {
        // 接收到文件参数时，触发file事件
        console.log('文件-----')
        console.log(
          name,file, ...rest
        )
      })
      
      form.on('field', (name, value) => {
        // 接收到数据参数时，触发field事件
        console.log('数据------')
        // console.log(name)

      })
      
      form.on('close', () => {
        res.send({
          code: 200,
          msg: '文件上传成功',
          data: dataRes
        })
      })

      form.on('error', function (err) {
        console.log('Error: ' + err.stack);
      })

    } catch (error) {
      res.send({
        code: 0,
        msg: '未知错误查看err!',
        error: error
      })
    }
  }

}
