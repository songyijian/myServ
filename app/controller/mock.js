const fs = require('fs-extra')
const slash = require('slash')
const path = require("path")
const multiparty = require('multiparty')
const { isDirCallFn, isFileCallFn, isFileUrl } = require("../model/func")

module.exports = {
  // cmock 页面
  "render": (req, res, next) => {
    res.render("cmock.ejs")
  },


  // 创建自定义文件
  "creactMockFiles": (req, res, next) => {
    
    try {
      let {path, reqtxt, restxt} = req.body
      if (!path || !reqtxt || !restxt) {
        res.send({
          "state": 0,
          "info": `缺少必要参数！`
        });
       return
      }
      var urlP = req.__CONFIG__.mockfiles + `/${path.split('/').join('~') }.js`
      isFileCallFn(urlP, s => {
        if (s) {
          res.send({
            "state": 0,
            "info": `当前地址已存在${path}`
          });
        } else {
          
          fs.outputFile(urlP, JSON.stringify(req.body), function (err) {
            if (err) {
              console.log('创建失败！', err)
              res.send({
                "state": 0,
                "info": `创建失败${urlP}`,
                err
              })
            } else {
              res.send({
                "state": 1,
                "info": `创建成功！${urlP}`
              });
            }
          })
        }
      })

      // console.log(req.body, fsrc)
      res.send({
        "state": 200,
        "info": '创建成功',
        "data": {
          path,
          reqtxt,
          restxt
        }
      })
    } catch (error) {
      res.send({
        "state": 0,
        "info": '未知错误！',
        error
      });
    }
  },


  /* 
  问价上传接口
  */
  "upload": (req, res, next)=>{
    try {
      var dataRes = {
        file:[],
        field: []
      }
      
      let form = new multiparty.Form({
        uploadDir: req.__CONFIG__.uploadFilesDir // 存储目录
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