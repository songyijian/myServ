
# 前端自动化工具 0.3.1
视频展示: [youku 地址] (http://v.youku.com/v_show/id_XMjg3NDU4NzQ1Mg==.html?spm=a2hzp.8244740.userfeed.5!3~5~5~5!2~A)

**更新说明**  
0.3.1
> 端口修改
> 文本在新页面打开目录在当页也打开

0.3.0
>url直接获得本地ip手机可直接扫码
> http://10.130.150.208:9000/endcard



## 环境
node v8.9.1


## 搭建本地环境服务
1.依赖安装node环境，
2.npm install
3.npm start,启动服务器并打开操作系统页面
4.平滑重启


###	这是一个前端效率工具，基于node开发,处理一些特定业务（可以用nonde自由拓展）：
* 搭建本地环境服务
* 项目仓库配置管理
* 模版规则配置
* 根据模版配置自动构建项目
* 项目及仓库静态化
* js，css，sass文件的编译压缩
* 静态文件引入路径的版本号一键添加需改（0.1.3 对css、html 做了优化处理，防止jq方法被错误处理 ）


## 项目仓库配置管理 ， 模版规则配置
模版和仓库的配置文件 ：set.json
ItemType //项目仓库配置，可配置多个仓库，为避免路径问题建议统一填写磁盘的绝对地址
template //模版配置同上，支持文件夹和文件的构建，文件内容支持 template：字段 和 get：线上爬取文本文件（现不支持媒体文件），两个模式


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
        }, {
            "name": "mac",
            "id": "mac",
            "list": [
                { "name": "set", "id": "set", "path": "/Users/yjsong/D/fis" }
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
                        "js",	    /* 目录文件夹 */
                        "js/1.js",	/* 目录下文件 */
                        "css/1.css",
                        "css/1.sass",
                        {
                            "name":"_.json",	/* 这是项目压缩编译配置表，生成后可到项目下再编辑 */
                            /* 指定字段 */
                            "template":"{\"js\":{\"entry\":[\"js/1.js\"],\"output\":\"js/js_min.js\"},\"css\":{\"entry\":[\"css/1.sass\",\"css/1.css\"],\"output\":\"css/css_min.css\"},\"edition\":[\"./index.html\",\"js/1.js\"],\"v\":\"0.0.1\"}"
                        },
                        {
                            "name": "index.html",
                            "get": "http://test.go.163.com/go/2017/0228/bTest/song_PC.html"	    //抓取线上（css,js 都适用）
                        }
                    ]
        }
    ]
}
```

## 项目及仓库静态化
* 模拟一个可视化的目录结构
* 检测基本项目单位显示压缩编译操作按钮
* 服务器输出指定文件到浏览器展示


##  js，css，sass文件的编译压缩，项目中引入的静态文件地址自动添加版本号

当前目录下出现_.json会被视为一个项目单位，自动出现编译压缩按钮，
_.json 可自己创建。推荐直接在模版配置自动生成。再根据项目情况自行修改配置

```
{
	"js":{
		"entry":["js/1.js","js/2.js"],	//要对哪些js压缩，数组顺序即为压缩后的先后顺序
		"output":"js/js_min.js"			//把上面的文件压缩到哪个文件里，文件不存正会自动生成
	},
	"css":{
		"entry":["css/1.sass","css/1.css"],	//css压缩文件，sass会被编译后再压缩
		"output":"css/css_min.css"			//同上
	},
	"edition":["./index.html"],		//需要静态文件引入地址后面加版本号的地址
	"v":"0.1.2"
}
```

0.2.0 版本修改当前项目配置表后无需再刷新当前页面。这点方便了很多（不过对于排除压缩编译文件来说还是做不到的，添加更有意义）
