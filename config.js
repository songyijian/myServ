module.exports = {
    /**启动端口号， 不设置默认8080端口 */
    "port" : 80,

    /**
     * 本地静态项目仓库列表
     * 每个仓储id应该唯一
     * */
    "item_type":[
        { "name": "mock数据", "id": "mockdatas", "path": "/Users/happyelements/git/mockdatas" },
        { "name": "endcard", "id": "endcards", "path": "/Users/happyelements/git/endcards" },
        { "name": "endcard模版", "id": "endcardTemplate", "path": "/Users/happyelements/git/sigmob-fe-endcardTemplate" }
    ],
    
    /**自动生产项目模版配置
     * 模版id应该唯一
    */
    "template": [
        {
            "name": "标准web项目",
            "id": 100,
            "objs": [
                "images",
                "css",
                "js",
                "js/index.js",
                "css/css.css",
                "css/sass.sass",
                {
                    "name": "_.json",
                    "template": "{\"js\":{\"entry\":[\"js/1.js\"],\"output\":\"js/js_min.js\"},\"css\":{\"entry\":[\"css/1.sass\",\"css/1.css\"],\"output\":\"css/css_min.css\"},\"edition\":[\"./index.html\",\"js/1.js\"],\"v\":\"0.0.1\"}"
                },
                {
                    "name": "index.html",
                    "template": "xxxx"
                }
            ]
        },
        {
            "name": "JQ_html",
            "id": 200,
            "objs": [
                {
                    "name": "_.json",
                    "template": "{\"js\":{\"entry\":[\"js/1.js\"],\"output\":\"js/js_min.js\"},\"css\":{\"entry\":[\"css/1.sass\",\"css/1.css\"],\"output\":\"css/css_min.css\"},\"edition\":[\"./index.html\",\"js/1.js\"],\"v\":\"0.0.1\"}"
                },
                {
                    "name": "index.html",
                    "template": "<!doctype html><html><head><meta charset=\"utf-8\"><title>Demo</title><script src=\"https: //cdn.bootcss.com/jquery/3.3.1/jquery.js\"></script></head><body><p> 3.3.1/jquery.js</p><script></script></body></html>"
                }
            ]
        },
        {
            "name": "JSON",
            "id": 300,
            "objs": [
                {
                    "name": "mocks.json",
                    "template": "{\"js\":{\"entry\":[\"js/1.js\"],\"output\":\"js/js_min.js\"},\"css\":{\"entry\":[\"css/1.sass\",\"css/1.css\"],\"output\":\"css/css_min.css\"},\"edition\":[\"./index.html\",\"js/1.js\"],\"v\":\"0.0.1\"}"
                }
            ]
        }
    ]
}
