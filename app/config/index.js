/*
 * @Description: 服务配置文件
 * @Author: yijian.song
 * @Date: 2019-08-22 15:19:30
 * @LastEditors: yijian.song
 * @LastEditTime: 2020-04-04 17:05:06
 */


/**
 * @Description: 简单的获取命令参数
 * @case: 
 * > node server.js --name=ajanuw --post=14
 * let a = new Argvs();
 *     a.argvsAll           // [ { name: 'ajanuw' }, { post: '14' } ]
 *     a.argvsGet('name')   // ajanuw
 *     a.argvsGet('post')   // 14
 *     a.argvsKeys()        // [ 'name', 'post' ]
 *     a.argvsHas('name')   // true
 * ---------
 * @Author: yijian.song
 * @Date: 2019-04-22 15:24:18z
 */
class Argvs {
    constructor() {
        this.argvsAll = this.argvsAll();
    }
    argvsAll() {
        return process.argv.slice(2).reduce((acc, item) => {
            item = item.split(/=/);
            const [k, v] = [item[0].replace(/-/gi, ''), item[1]];
            acc.push({
                [k]: v
            });
            return acc;
        }, [])
    }

    argvsGet(k) {
        return this.argvsAll.reduce((acc, item) =>
            acc ?
            acc :
            (k in item) ?
            acc = item[k] :
            acc, false)
    }

    argvsKeys(argvsAll) {
        if (!argvsAll) argvsAll = this.argvsAll;
        return argvsAll.reduce((acc, item) => {
            return [...acc, ...Object.keys(item)]
        }, [])
    }
    argvsHas(k) {
        return Object.is(this.argvsKeys().indexOf(k), -1) ? false : true;
    }
}

const path = require('path')
const argvs = new Argvs()
const { itemType } = argvs.argvsGet('host') == 'happyelements' ? require('./happyelements') : require('./myMac')

// 抹平系统差异，把相对路径补齐
function setPath(params) {
    return path.normalize(__dirname + '/' + params);
}


module.exports = {
    // 获取命令参数 (> node ./app/app --host=myMac)
    "argvs": argvs,

    // 启动端口号， 不设置默认8080端口
    "port": 80,

    // 文件上传存储地址配置
    "uploadFiles": setPath('../../uploads'),

    // mock数据入口文件
    "mockfiles": setPath('../../mocks'),

    // 启动程序时自动在浏览器打开
    // "opn": true,

    // 指定IDE打开命令${}会被替换成打开的地址 （ 'atom ${}' | 'code ${}' ）
    "IDEOpen": 'code ${}',

    // 本地静态项目仓库id唯一  (id保留关键字 api, upload，mock)
    "item_type": itemType,

    // 自动生产项目模版配置,模版id应该唯一
    "template": [{
            "name": "标准web项目",
            "id": 100,
            "objs": [
                "images",
                "js/index.js",
                "css/css.css",
                // {
                //     "name": "_.json",
                //     "template": "{\"js\":{\"entry\":[\"js/1.js\"],\"output\":\"js/js_min.js\"},\"css\":{\"entry\":[\"css/1.sass\",\"css/1.css\"],\"output\":\"css/css_min.css\"},\"edition\":[\"./index.html\",\"js/1.js\"],\"v\":\"0.0.1\"}"
                // },
                {
                    "name": "index.html",
                    "template": `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta content="yes" name="apple-mobile-web-app-capable">
  <meta content="yes" name="mobile-web-app-capable">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="renderer" content="webkit">
  <script charset="utf-8" src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
  <title></title>
</head>
<body>
  <div id="app">jquery/3.3.1</div>
  <script type="module">import fn from './js/index.mjs'</script>
</body>
</html>`
                }
            ]
        },
        {
            "name": "JQhtml",
            "id": 200,
            "objs": [{
                "name": "index.html",
                "template": `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta content="yes" name="apple-mobile-web-app-capable">
  <meta content="yes" name="mobile-web-app-capable">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="renderer" content="webkit">
  <script charset="utf-8" src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
  <title></title>
</head>
<body>
  <div id="app">jquery/3.3.1</div>
</body>
</html>`
            }]
        },
        {
            "name": "JSON",
            "id": 300,
            "objs": [{
                "name": "index.json",
                "template": `{
                    "msg": "",
                    "code": 200,
                    "data":{}
                }`
            }]
        }
    ]
}