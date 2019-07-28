
const multiparty = require('multiparty')

module.exports = {
  /**
   * mockwait?time=3000（毫秒，不操作10秒）
   */
  get : (req, res, next) => {
    try {
      let getData = req.query
      let time = Number(getData.time || 0);
      setTimeout(() => {
        res.send({
          code: 200,
          msg: 'mock/get， 成功获取数据',
          data: getData
        })
      }, time)
    } catch (error) {
      res.send({
        code: 0,
        msg: 'mock/post 未知错误查看err!',
        error: error
      })
    }
  },


  // 文件上传接口
  "upload": (req, res, next) => {
    try {
      var dataRes = {
        file: [],
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

