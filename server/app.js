"use strict"
const configData = require("./config")
const { httpPort = 8080, socketPort = 9090 } = configData
const express = require("express")
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser')
const path = require('path')
const opn = require("opn")
const routers = require("./router")
const func = require("./func")

//cors中间件
app.use(function (req, res, next) {
  req.__CONFIG__ = configData;
  const origin = req.get('origin');
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE,CONNECT,OPTIONS,TRACE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  if (req.method === 'OPTIONS') {
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
  if (item.id == 'mock' || item.id == 'upload') {
    throw '仓库id存在保留关键字upload|mock'
  }
  app.use(`/${item.id}`, express.static(`${item.path}`, {
    'index': []
  }))
})

//http交互
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//router
app.use(routers)
app.use((req, res) => {
  res.status(404).render('err', {
    err: "404"
  })
})

// 启动 http服务
app.listen(httpPort, (err) => {
  if (err) {
    console.error(`本地${httpPort}端口可能被占用`, err);
    return;
  }
  var url = `http://${func.getIPAdress()}:${httpPort}`
  console.log('>http-Network ' + url)
  console.log('>http-Local ' + `http://localhost:${httpPort}`)
  configData.open && opn(url)
})



// // 启动 socket服务
// server.listen(socketPort, (err) => {
//   if (err) {
//     console.error(`本地${socketPort}端口可能被占用`,err); return
//   }
//   console.log('>socket—Network ' + `http://${func.getIPAdress()}:${socketPort}` )
//   console.log('>socket—Local ' + `http://localhost:${socketPort}`)
// })

// // socket 需要时再打开吧
// let userList = []
// io.on('connection', function (socket) {
//   // io.emit(foo); //会触发所有客户端用户的foo事件
//   // socket.emit(foo); //只触发当前客户端用户的foo事件
//   // socket.broadcast.emit(foo); //触发除了当前客户端用户的其他用户的foo事件

//   // 监听服务端消息
//   var name = ''
//   socket.on('login',(data)=>{
//     name = data.name
//     if(name && userList.indexOf(name) < 0){
//       userList.push(name)
//       io.emit('loginUser',userList)
//     }else{
//       socket.emit('loginError','用户已存在')
//     }
//   })

//   socket.on('close',(data)=>{
//     name = ''
//     if(name && userList.indexOf(name) < 0){
//       userList = userList.map(item=>item!==name)
//       io.emit('loginUser',userList)
//     }
//   })

//   //监听客户信息
//   socket.on('message', function (data) {
//     io.emit('message',data);
//   });
// });