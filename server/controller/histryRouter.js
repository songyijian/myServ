/*
 * @Description:
 * @Author: yijian.song
 * @Version: 1.0.0
 * @Date: 2021-10-10 01:00:36
 * @LastEditors: yijian.song
 * @LastEditTime: 2021-10-10 01:11:20
 */


module.exports = {
  // vue histry Router

  index (req, res, next) {

    fs.readdir('./histry', (error, data) => {
      res.render("histry", {
        err: error,
        data,
        pathy
      })
    })

  }

};

