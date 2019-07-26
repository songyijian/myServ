
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

  upload: (req, res, next)=>{

    // var uploadDir = path.normalize(__dirname + '/' + "../files");
    // const form = new multiparty.Form({
    //   uploadDir: './upload' // 指定文件存储目录
    // })

  }

}

