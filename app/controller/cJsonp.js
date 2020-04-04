/*
 * @Description: 
 * @Author: yijian.song
 * @Version: 3.0.0
 * @Date: 2020-04-02 11:54:23
 * @LastEditors: yijian.song
 * @LastEditTime: 2020-04-02 16:27:54
 */

module.exports = {
  jsonp:(req, res, next) => {
    const { body, query, method } = req
    if(query.callback){
      var str = query.callback + '(' + JSON.stringify({code:200, data:'12345678'}) + ')';
      res.end(str);
    }else{
      res.end()
    }
  }
}