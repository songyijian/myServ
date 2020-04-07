"use strict"
const configData = require("./config")
const { port=8080 } = configData
const express = require("express")
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser')
const path = require('path')
const opn = require("opn")
const routers = require("./router")
const func = require("./model/func")


//业务中间件
app.use(function (req, res, next) {
  req.__CONFIG__ = configData;  //项目对配置直接带过去
  const origin = req.get('origin'); // http://192.168.0.101
  res.setHeader('Access-Control-Allow-Origin', origin||'*'); //哪些源发出请求：* 支持多源但不能再返回cookie了 ｜  "http://www.demo.com:80"
  // GET,HEAD,POST不会触发CORS预检请求,其他必须首先使用OPTIONS方法发起一个预检请求到服务器
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE,CONNECT,OPTIONS,TRACE,PATCH'); // 支持那些形式都请求
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); //允许的请求头
  res.setHeader('Access-Control-Allow-Credentials', 'false'); //是否允许带资源凭证，cookie等
  if (req.method === 'OPTIONS') { // 如果是个预检请求，就直接发布会成功
    res.send('ok');
    retrun;
  }
  next();
})

//模版
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// 目录静态化
app.use('', express.static(__dirname + '/public'));
configData.item_type.forEach((item, i) => {
  if (item.id == 'mock' || item.id == 'upload'){
    throw '仓库id存在保留关键字upload|mock'
  }
  app.use(`/${item.id}`, express.static(`${item.path}`, {
    'index': []
  }))
})

//http交互
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//router
app.use(routers)
app.use((req, res) => { res.status(404).render('err', { err: "404"})})

server.listen(port, (err) => { //这里为了支持socket
  if (err) {
    console.error(`本地${port}端口可能被占用`,err)
  }else{
    let url = `http://${func.getIPAdress()}:${port}`
    console.log('> Network ' + url )
    console.log('> Local ' + `http://localhost:${port}`)
    // 自动打开页面
    configData.opn && opn(url)
  }
})




// socket
io.on('connection', function (socket) {
  //通知客户端已连接
  socket.emit('open');
  socket.on('message', function (data) {
    //服务端像所以也没发送数据
    io.sockets.emit('message', data.message);
  });
});