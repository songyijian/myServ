const path = require("path")
const queryString = require("querystring")
const fs = require('fs-extra')
const slash = require('slash')
const uglifyjs = require("uglify-js");
const CleanCSS = require('clean-css');
const sass = require('node-sass');
var cassys={format : ' keep-  breaking '}

exports.mergeFile = (ajaxData, endfn) => {
  var pPath = ajaxData.path;
  var _jp = null;
  try{
		_jp=JSON.parse(ajaxData.config)
	}catch(err){
    endfn({ "state":0, "info": "_.json文件不被能被解析请检查后再试" , err })
    return
	}

  //js 文件列表路径处理
  var jsCssList=[]
  if(Array.isArray(_jp.js.entry)){
    _jp.js.entry.forEach((item)=>{
      jsCssList.push( {name:item,path:slash(path.resolve(pPath+'/'+item))} )
    })
  }
  if(typeof _jp.js.entry === 'string'){
    jsCssList.push( [{name: _jp.js.entry,path:slash(path.resolve(pPath+'/'+_jp.js.entry))}] )
  }
  //css 文件列表路径处理
  if(Array.isArray(_jp.css.entry)){
    _jp.css.entry.forEach((item)=>{
      jsCssList.push( {name:item,path:slash(path.resolve(pPath+'/'+item))} )
    })
  }
  if(typeof _jp.css.entry === 'string'){
    jsCssList.push( [{name: _jp.js.entry,path:slash(path.resolve(pPath+'/'+_jp.js.entry))}] )
  }

  console.log('----------- 待编译压缩文件List ------------')
  console.log( jsCssList);



  //css和js 读取函数==========
  var rJsCssData=[];
  function rBianYiDataList(arr) {
    // console.log('--------- rBianYiDataList')
    return arr.map((item,index)=>{
      return  new Promise((resolve,reject)=>{
          if( path.extname(item.path) === '.css' || path.extname(item.path) === '.sass'){
            fs.readFile(item.path, {flag: 'r+', encoding: 'utf8'},  (err, data) =>{
              if(err) {
                if(path.extname(item.path) === '.css'){
                  rJsCssData.push({index,type:'css',path:item.path,name:item.name,data:null,err,time:new Date()})
                }
                return;
              }
              if(path.extname(item.path) === '.sass'){
                try{
                  let result = sass.renderSync({data: data ==='' ? "" : data});
                      result = new CleanCSS(cassys).minify( result ).styles;
                  rJsCssData.push({index,type:'css',path:item.path,name:item.name,data:result.css.toString(),err:null,time:new Date()})
                }catch(err){
                  rJsCssData.push({index,type:'css',path:item.path,name:item.name,data:null,err,time:new Date()})
                }
                resolve(item.name)
              }
              if(path.extname(item.path) === '.css'){
                rJsCssData.push({index,type:'css',path:item.path,name:item.name,data:new CleanCSS(cassys).minify(data).styles,err:null,time:new Date()})
                resolve(item.name)
              }
            })
          }

          if(path.extname(item.path) === '.js'){
            try{
              let data=uglifyjs.minify(item.path).code
              rJsCssData.push({index,type:'js',path:item.path,name:item.name,data,err:null,time:new Date()})
            }catch(err){
              rJsCssData.push({index,type:'js',path:item.path,name:item.name,data:null,err,time:new Date()})
            }
            resolve(item.name)
          }
      })
    })
  }

  //css和js 编译写入==========
  var jsOutPath = slash(path.resolve(pPath+'/'+_jp.js.output))
  var cssOutPath = slash(path.resolve(pPath+'/'+_jp.css.output))
  console.log('写入文件路径：',cssOutPath,'\n',jsOutPath)
  
  //写入函数
  function dataOutFile(array,fn) {
      let sJsdata='' , sCssdata='';

      array.forEach((item,index)=>{
        if(item.type==='js'){
          sJsdata += `\/\* ${item.name} - ${item.time}*\/` + ( item.data !==null ? `\n ${item.data}\n` : `\n \/\* ${item.err} \*\/\n`)
        }
        if(item.type==='css'){
          sCssdata += `\/\* ${item.name} - ${item.time}*\/` + (item.data !==null ? `\n ${item.data}\n`:`\n \/\* ${item.err} \*\/\n`)
        }
      })

      fs.outputFile(jsOutPath, sJsdata , (err)=>{
        if(err){
          if(fn)fn({'state':0,'info':'js编译数据写入错误',err}); return
        }
        if(fn)fn({'state':1,'info':`${jsOutPath} 写入成功`,'err':null})
      })
      fs.outputFile(cssOutPath, sCssdata, (err)=>{
        if(err){
          if(fn)fn({'state':0,'info':'css编译数据写入错误',err}); return
        }
        if(fn)fn({'state':1,'info':`${cssOutPath} 写入成功`,'err':null})
      })
  }


  //CSS,JS 编译&写入
  Promise.all( rBianYiDataList(jsCssList) ).then((o)=>{
    dataOutFile(rJsCssData,(data)=>{
      console.log('----------- 第一次编译数据写入完成 ------------')
      console.log(rJsCssData)
    })
  }).catch(function(err) {})



  //监控读写操作
  function watchF(oArr,fn) {
    oArr.forEach((item,index,arr)=>{
      fs.watchFile(item.path,{persistent: true, interval: 500},  (curr, prev)=> {
        if(Date.parse(prev.ctime) == 0) {
          console.log(item.name+':文件被创建!');
        } else if(Date.parse(curr.ctime) == 0) {
          console.log(item.name+'文件被删除!')
        } else if(Date.parse(curr.mtime) != Date.parse(prev.mtime)) {

          rwatch(rJsCssData,item,fn)
        }
      })
    })
    console.log('----------- 监听启动 ------------')
    endfn({"state":1, "info": "监听已经启动" })
  }

  //观察变化后处理文件
  function rwatch(olist,oChang,fn) {
    olist.forEach((item,index)=>{
      if(item.path === oChang.path ){
        //console.log('监测变化',oChang.name)
        if(path.extname(oChang.path) !== '.js'){
          fs.readFile(oChang.path, {flag: 'r+', encoding: 'utf8'},  (err, data) =>{
            item.time = new Date();
            if(err) {
              item.err = err;
              item.data = null;
              return;
            }

            item.err = null;
            if(path.extname(oChang.path) === '.css'){
              item.data = new CleanCSS(cassys).minify(data).styles;
            }
            if(path.extname(oChang.path) === '.sass'){
              try {
                let result =sass.renderSync({ data: data ==='' ? `\/\/` : data });
                item.data = new CleanCSS(cassys).minify( result.css.toString() ).styles;
                item.err =null
              } catch (err) {
                item.data = null
                item.err =err
              }
            }
            fn()
          })
        }

        if(path.extname(oChang.path) === '.js'){
          item.time = new Date();
          try{
            let data=uglifyjs.minify(oChang.path).code;
            item.data = data;
          }catch(err){
            item.data = null;
            item.err = err;
          }
          fn()
        }  
      }
    })
  }


  if(jsCssList){
      watchF(jsCssList,()=>{
        dataOutFile(rJsCssData,(data)=>{
          console.log('----------- 检测处理状态 ------------')
          console.log(data)
        })
      })
  }else{
    endfn({"state":0, "info": " _.json没有配置编译" })
  }

}