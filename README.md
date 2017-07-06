
# 前端自动化工具 0.1.2

###	这是一个前端效率工具，基于node开发基础业务处理：

	* 搭建本地环境服务

	* 项目仓库配置管理

	* 项目构建（根据配置自动生成项目文件）

	* 项目及仓库静态化

	* 文件的编译压缩打包，静态文件引入地址的版本号控制


## 搭建本地环境服务

	先配置node环境，npm依赖

	再运行node app  自动启动本地服务器和打开系统页面


## 项目仓库配置 ， 项目构建模版
	
	都是基于set.json 的配置

	ItemType 	//项目仓库配置，array可配置多个仓库，为避免路径问题建议统一填写磁盘的绝对地址

	template	//模版管理,同上可以配置多个模版，支持文件和文件的构建，
					文件内容支持 template 和 get求（爬取）线上两个模式
```
{
    "me": "yjsong",

    /* 仓库配置 */
    "ItemType": [{
            "name": "auto",
            "id": "auto",
            "list": [
                { "name": "2016", "id": "2016", "path": "E:/SVN/auto/2016" },
                { "name": "2017", "id": "2017", "path": "E:/SVN/auto/2017" }
            ]
        },{
            "name": "go",
            "id": "go",
            "list": [
                { "name": "2016", "id": "2016", "path": "E:/SVN/2016" },
                { "name": "2017", "id": "2017", "path": "E:/SVN/2017" }
            ]
        }
    ],
    //模版配置
    "template": [{
            "name": "PC",
            "mb_id": 1,
            "structure": [
                        "images",
                        "css",
                        "js",	/* 目录文件夹 */
                        "js/1.js",	/* 目录下文件 */
                        "css/1.css",
                        "css/1.sass",
                        {
                            "name":"_.json",	/* 这个文件会影响到后期项目才处理，生成后可到项目下再编辑 */
                            /* 指定字段 */
                            "template":"{\"js\":{\"entry\":[\"js/1.js\"],\"output\":\"js/js_min.js\"},\"css\":{\"entry\":[\"css/1.sass\",\"css/1.css\"],\"output\":\"css/css_min.css\"},\"edition\":[\"./index.html\",\"js/1.js\"],\"v\":\"0.0.1\"}"
                        },
                        {
                            "name": "index.html",
                            "get": "http://test.go.163.com/go/2017/0228/bTest/song_PC.html"	//抓取线上
                        }
                    ]
        },{
            "name": "song_WAP",
            "mb_id": 2,
            "structure": [
                        "images",
                        "css",
                        "js",
                        "js/1.js",
                        "css/1.css",
                        "css/1.sass",
                        {
                            "name":"_.json",
                            "template":"{\"js\":{\"entry\":[\"js/1.js\"],\"output\":\"js/js_min.js\"},\"css\":{\"entry\":[\"css/1.sass\",\"css/1.css\"],\"output\":\"css/css_min.css\"},\"edition\":[\"./index.html\",\"js/1.js\"],\"v\":\"0.0.1\"}"
                        },
                        {
                            "name": "index.html",
                            "get": "http://test.go.163.com/go/2017/0228/bTest/song_WAP.html"
                        }
                    ]
        }
    ]
}
```

## 项目及仓库静态化
	
	* 模拟一个可视化的目录结构

	* 检测基本项目单位，展示压缩之类的操作按钮

	* 输出指定文件



##  文件的编译压缩打包，静态文件引入地址的版本号控制

	静态化目录内，如果被识别为一个项目单位现阶段会显示实时编译压缩，和给静态文件加版本号两个功能，这是自己单位业务需求所开发的功能

	指定编译压缩哪个文件，给哪个文件处理版本号(css,html,js 文件不限)，都由_.json文件控制，可自己创建，建议模版配置一下自动生成。然后再根据项目情况自行修改配置

```
{
	"js":{
		"entry":["js/1.js","js/2.js"],	//要对那些js压缩，数组顺序即为压缩的先后顺序
		"output":"js/js_min.js"			//压缩到哪个文件里，文件不纯正会自动生成
	},
	"css":{
		"entry":["css/1.sass","css/1.css"],	//css 压缩文件，sass会被编译后再压缩
		"output":"css/css_min.css"			//压缩到哪个文件里,同上
	},
	"edition":["./index.html"],		//给哪个文件内的静态文件引入地址后面加版本号
	"v":"0.0.1"
}

```

0.1.2 版本修改当前项目配置表后无需再刷新当前页面。这点方便了很多（不过对于排除压缩编译文件来说还是做不到的，添加更有意义）