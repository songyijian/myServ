/**
 * @Description:  URLParams url参数序列化和反序列化
 * @param {str | obj} o 携带参数的url字符串 | json会格式化成参数str
 * @return: {obj | str}  obj>格式化字符串 | str格式化成json
 *
 *  URLParams({a:'trtfds',b:123456}) > a=trtfds&b=123456
 *  URLParams("demos/FN验证.html?q=searchParams&topic=api") > {"q":"searchParams","topic":"api"}
 */
function URLParams(o) {
  if (typeof o === 'string' && o.trim().length > 2) {
    let url = o
    if (o.lastIndexOf('?') >= 0) {
      url = o.split('?')[1]
    }
    return JSON.parse('{"' + decodeURIComponent(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  } else if (Object.prototype.toString.call(o).slice(8, -1) === 'Object') {
    if (!o) return '';
    let pairs = [];
    for (var key in o) {
      var value = o[key];
      if (value instanceof Array) {
        for (var i = 0; i < value.length; ++i) {
          pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]))
        }
        continue
      }
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(o[key]));
    }
    return pairs.join('&');
  }

  throw 'URLParams 参数错误！'
}
