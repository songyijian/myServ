/*
 * @Description: 服务配置文件
 * @Author: yijian.song
 * @Date: 2019-08-22 15:19:30
 * @LastEditors:
 * @LastEditTime: 2019-09-06 10:12:38
 */
const path = require('path')
// 抹平系统差异，把相对路径补齐
function setPath(params) {
    return path.normalize(__dirname + '/' + params);
}

/**
 * @Description: 配置列表
 * @Author: yijian.song
 * @Version: 0.7.0
 * @LastEditors: yijian.song
 * @LastEditTime:
 * @Date: 2019-08-23 19:52:17
 */
module.exports = {
    /**启动端口号， 不设置默认8080端口 */
    "port": 80,

    // 文件上传存储地址配置
    "uploadFiles": setPath('../uploadfiles'),

    // mock数据入口文件
    "mockfiles": setPath('../mockfiles'),

    // 启动程序时自动在浏览器打开
    // "opn":true,

    // 指定IDE打开命令${}会被替换成打开的地址
    // 'atom ${}' | 'code ${}'
    "IDEOpen": 'code ${}',

    /**
     * 本地静态项目仓库
     *   id为一：保留关键字 api, upload，mock
     */
    "item_type": [{
            "name": "myMac_a",
            "id": "maymac",
            "path": "/Users/yjsong/B/test"
        },
        {
            "name": "minItem",
            "id": "item",
            "path": "/Users/happyelements/gitlab/item"
        },
        {
            "name": "webFE",
            "id": "githubWebFE",
            "path": "/Users/happyelements/github/webFE"
        },
        {
            "name": "sigmob-fe-endcardTemplate",
            "id": "sigmob-fe-endcardTemplate",
            "path": "/Users/happyelements/gitlab/sigmob-fe-endcardTemplate"
        }
    ],

    /**
     * 自动生产项目模版配置
     * 模版id应该唯一
     */
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
