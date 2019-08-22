const multiparty = require('multiparty')

module.exports = {
  // 上传页面
  "uploadRender": (req, res, next) => {
    res.render("upload");
  },


  // 文件上传
  "upload": (req, res, next) => {
    let dirsrc = req.__CONFIG__.uploadFiles
    let form = new multiparty.Form()
    form.encoding = 'utf-8'
    form.uploadDir = dirsrc
    form.parse(req)
    var resData = {
      files: [],
      txt:[]
    }

    form.on('file', (name, file, ...rest) => {
      // 接收文件
      // console.log('文件-----')
      resData.files.push({
        url: file.path,             //保存后的文件地址
        name: file.originalFilename //原始文件名
      })
    })

    form.on('field', (name, value) => {
      // 接收数据参数
      // console.log('数据------')
      resData.txt.push({
        key:name,value
      })
    })

    form.on('close', () => {
      res.send({
        code: 200,
        msg: '文件上传成功！ ',
        data: resData
      })
    })

    form.on('error', function (err) {
      res.send({
        code: 0,
        msg: '文件上传失败! ',
        error: err.stack
      })
    })
  }

}
