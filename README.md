# 本地服务系统

```
/**
 * @Description: 本地服务系统
 * @Author: yijian.song
 * @Version: 0.7.0
 * @LastEditTime: 
 * @LastEditors: yijian.song
 * @Date: 2019-08-22 16:37:23
 */ 
```

---

### 环境
- node v8.9.1+  //确保node安装
- npm install   //装依赖
- npm run start //启动服务

---

### 功能列表
- 本地仓库（所以文件项目都是基于本地仓库配置的）
- 根据模版创建项目
- 自定义本地文件
- 仓库做了CORF跨域处理，可用直接请求仓库下的json文件，mock接口数据
- get响应延时接口/mockwait?time=3000（毫秒）模拟异步请求使用
- 文件上传接口/upload，储存目录可配置（文件夹路径）

---

### 目录结构
```
app
├── app
│   ├── controller	#主要业务
│   │   ├── mock.js	# 接口mock业务
│   │   └── handle.js	# 核心业务	
│   │
│   ├── model			# 公用方法
│   ├── public		# 项目静态资源，如css、js等存放的目录
│   ├── views			# 项目模版文件ejs
│   ├── app.js		# 应用运行文件
│   ├── config.js	# 配置信息( 配置自己的项目仓库、自定义模版 )
│   └── router.js	# 路由文件
│
├── files 	#上传文件存储（默认会静态化该文件夹）
├── node_modules 	# 依赖的模块
└── package.json 	# node模块的配置文件

```

---

### config.js 配置文件
- item_type：静态本地仓库（本地绝对路径）配置
- template：模版仓库
- port：本地服务端口，默认：8080
- uploadFiles：上传文件存储目录

---


### 下面的业务已废弃 （请忽略）

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

<!-- 老版本演示视频: [youku 地址] (http://v.youku.com/v_show/id_XMjg3NDU4NzQ1Mg==.html?spm=a2hzp.8244740.userfeed.5!3~5~5~5!2~A) -->