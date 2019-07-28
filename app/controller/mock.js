// const fs = require('fs-extra')
// const slash = require('slash')
// const path = require("path")
// const { isDirCallFn, isFileCallFn, isFileUrl } = require("../model/func")
const multiparty = require('multiparty')

module.exports = {
  // cmock 页面
  "render": (req, res, next) => {
    res.render("cmock.ejs")
  },


  /* 
  文件上传接口
  */
  "upload": (req, res, next)=>{
    try {
      var dataRes = {
        file:[],
        field: []
      }
      
      let form = new multiparty.Form({
        uploadDir: req.__CONFIG__.uploadFiles // 存储目录
      })
      form.parse(req) 
      form.on('file', (name, file, ...rest) => { 
        // 接收到文件参数时，触发file事件
        dataRes.file.push({
          "name": name,
          "file": file
        }) 
      })

      form.on('field', (name, value) => {
        // 接收到数据参数时，触发field事件
        dataRes.field.push({
          "name": name,
          "file": value
        })
      })

      form.on('close', () => { 
        res.send({
          code: 200,
          msg: '文件上传成功',
          data: dataRes
        })
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
