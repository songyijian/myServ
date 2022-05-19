# 本地服务系统

https://github.com/songyijian/myServ

## 环境

node 大于 v8.9.1+

# 功能列表

- 本地仓库（仓库内项目可访问和创建）
- 根据模版创建项目
- 仓库做了 CORF 跨域处理，可利用 json 文件 mock 接口数据（复杂逻辑可以直接利用内部的 mock 服务）
- 文件上传：/upload 用来测试真实的上传场景
- mock 服务：mockfiles/index.js 接口为服务入口文件（config.js 文件配置），可以利用 mockjs 模拟数据

## mock 服务

1. 路径 http://localhost:80/mock/xxx，/xxx 是你要 mock 的域名
2. 服务默认加载“mockfiles/”下的 index.js 文件（路径可以在 config.js 配置）
3. 服务使用 mockjs 实现

```
const Mock = require('mockjs') //如果用到mock语法直接引用
var myMap = new Map()	//输出map类型
/*
 * @Description: set结构
 * @param {string} key 要比配的路由 'a/b/c'
 * @param {func} val 请求返回值({ body,query,method})
 * @return: {type} 函数返回值
*/
myMap
  .set(
    'dsp/targetpack/switch',
    ({ body, query, method } )=>{
      //console.log(body, query, method)
      return Mock.mock(
        {"msg": "", "code": 200, "data": null}
      )
    }
  )

module.exports = myMap
```

### 目录结构

```
.
├── README.md
├── app
│   ├── app.js
│   ├── config  		# 项目配置文件
│   ├── controller 	# 主要业务
│   ├── service			# 更细化的业务服务
│   ├── public			# 项目静态资源
│   ├── router.js		# 路由文件
│   ├── func    		# 公共函数
│   └── views				# 项目模版文件ejs
├── uploadfiles		  # 上传文件存放位置，可配
├── mockfiles			  # mock业务，可配
│   └── index.js
├── package-lock.json
└── package.json
```

<!-- 老版本演示视频: [youku 地址] (http://v.youku.com/v_show/id_XMjg3NDU4NzQ1Mg==.html?spm=a2hzp.8244740.userfeed.5!3~5~5~5!2~A) -->
