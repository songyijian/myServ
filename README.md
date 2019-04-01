# 前端开发本地服务系统
> v0.5.0  , yijian.song


### 目录结构
```
app
├── app
│   ├── controller	#主要业务
│   │   ├── mock.js	# 接口mock业务
│   │   └── handle.js	# 核心业务	
│   │
│   ├── model		# 公用方法
│   ├── public		# 项目静态资源，如css、js等存放的目录
│   ├── views		# 项目模版文件ejs
│   ├── app.js		# 应用运行文件
│   ├── config.js	# 配置信息( 配置自己的项目仓库、自定义模版 )
│   └── router.js	# 路由文件
│
├── node_modules 	# 依赖的模块
└── package.json 	# node模块的配置文件

```

---

### config.js 配置文件
- item_type：静态本地仓库（本地绝对路径）配置
- template：模版仓库
- port：本地服务端口，默认：8080

---

### 功能列表
- 本地仓库（所以文件项目都是基于本地仓库配置的）
- 根据模版创建项目
- 自定义本地文件
- 仓库CORF做来跨域处理，可以自己放json模拟mock数据
- 响应延时get接口，mock/get?time=3000（毫秒），模拟一步请求等场景测试
- 响应延时post接口，mock/post?time=3000（毫秒），模拟一步请求等场景测试
- mock/jsonStr='{a:1}' jsonStr直接接收一个字符串格式的obj


### 环境
- node v8.9.1+  //确保node安装
- npm install   //装依赖
- npm run start //启动服务


---

该业务已废弃
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
	"edition":["./index.html"],		//需要静态文件引入地址后面加版本
}
```

###  老版本演示视频
视频展示: [youku 地址] (http://v.youku.com/v_show/id_XMjg3NDU4NzQ1Mg==.html?spm=a2hzp.8244740.userfeed.5!3~5~5~5!2~A)
