
const path = require("path")
const queryString = require("querystring")
const fs = require('fs-extra')
const slash = require('slash')
const uglifyjs = require("uglify-js");
const CleanCSS = require('clean-css');
const sass = require('node-sass');
var cassys={format : ' keep-  breaking '}


exports.mergeFile = (ajaxData, fn) => {
  let pPath = ajaxData.path;
  let _jp = null;
  var jsEntList,cssEntList;
  try{
		_jp=JSON.parse(ajaxData.config)
	}catch(err){
    fn({ "state":0, "info": "_.json配置错误 || 不是正确的json文件" , err })
    return
	}

  // 读取，监测文件 js css处理
  if(Array.isArray(_jp.js.entry)){
    jsEntList  = _jp.js.entry.map((item)=>{
        return  {name:item,path:slash(path.resolve(pPath+'/'+item))}
    })
  }
  if(typeof _jp.js.entry === 'string'){
    jsEntList  = [{name: _jp.js.entry,path:slash(path.resolve(pPath+'/'+_jp.js.entry))}]
  }
  if(Array.isArray(_jp.css.entry)){
    cssEntList  = _jp.css.entry.map((item)=>{
        return  {name:item,path:slash(path.resolve(pPath+'/'+item))}
    })
  }
  if(typeof _jp.css.entry === 'string'){
    cssEntList  = [{name: _jp.js.entry,path:slash(path.resolve(pPath+'/'+_jp.js.entry))}]
  }
  console.log('需要处理的文件目录列表 ：' ,jsEntList,cssEntList);



//先全全部读取放在arr内 ==========
  var rJsData, rCssData;
  function rBianYiDat(arr) {
    return arr.map((item,index,arr)=>{
      return  new Promise((resolve,reject)=>{
        if(arr===cssEntList){
          fs.readFile(item.path, {flag: 'r+', encoding: 'utf8'},  (err, data) =>{
            if(err) {
              resolve({index,path:item.path,name:item.name,data:null,err:`\/* ${err} *\/`,time:new Date()})
              return;
            }
            if(path.extname(item.path) === '.sass'){
              let result =sass.renderSync({
                data: data,
                outputStyle:'compressed'
              });
              // console.log(result,result.css.toString());
              resolve({index,path:item.path,name:item.name,data:result.css.toString(),err:null,time:new Date()})
            }else{
              // console.log(new CleanCSS({}).minify(data));
              resolve({index,path:item.path,name:item.name,data:new CleanCSS(cassys).minify(data).styles,err:null,time:new Date()})
            }
          });
        }
        if(arr===jsEntList){
          try{
            let data=uglifyjs.minify(item.path).code
            resolve({index,path:item.path,name:item.name,data,err:null,time:new Date()})
          }catch(err){
            resolve({index,path:item.path,name:item.name,data:null,err:`\/* ${err} *\/`,time:new Date()})
          }
        }
      })
    })
  }

  //CSS 编译文件详细信息
  Promise.all(rBianYiDat(cssEntList)).then((o)=>{
      rCssData=o;BY('css')
      console.log('编译CSS文件详细信息：',rCssData);
  }).catch(function(err) {
    console.log(err);
  })
  //JS 编译文件详细信息
  Promise.all(rBianYiDat(jsEntList)).then((o)=>{
      rJsData=o;BY('js');
      console.log('编译JS文件详细信息：',rJsData);
  }).catch(function(err) {
    console.log(err);
  })

  //数据编译写入 ======
  // rJsData，rCssData
  var jsOutPath = slash(path.resolve(pPath+'/'+_jp.js.output))
  var cssOutPath = slash(path.resolve(pPath+'/'+_jp.css.output))
  console.log('写入文件处理：',jsOutPath,jsOutPath)

  function BY(type) {
    //写入函数
    if(type === 'js'){
      console.log(rJsData);
      let sJsdata ='';
      for (var i = 0; i < rJsData.length; i++) {
        sJsdata += `\/* ${rJsData[i].name} - ${rJsData[i].time}*\/` + (rJsData[i].data ? `\n ${rJsData[i].data}\n`:`\n ${rJsData[i].err}\n`)
      }
      fs.outputFile(jsOutPath, sJsdata , function(err) {
        if(err){console.log(err);return}
        console.log('写入成功');
      })
    }
    if(type === 'css'){
      console.log(rCssData);

      let sCssdata ='';
      for (var i = 0; i < rCssData.length; i++) {
        sCssdata += `\/* ${rCssData[i].name} - ${rCssData[i].time}*\/` + (rCssData[i].data ? `\n ${rCssData[i].data}\n`:`\n ${rCssData[i].err}\n`);// ` \/* ${rCssData[i].name} - ${rCssData[i].time}*\/ \n ${rCssData[i].data}\n`
      }

      fs.outputFile(cssOutPath, sCssdata, function(err) {
        if(err){console.log(err);return}
        console.log('写入成功');
      })
    }
  }




  //监控读写操作
  function watchF(oArr,fn) {
    oArr.forEach((item,index,arr)=>{
      fs.watchFile(item.path,{persistent: true, interval: 500},  (curr, prev)=> {
        if(Date.parse(prev.ctime) == 0) {
          console.log(item.name+'文件被创建!');
        } else if(Date.parse(curr.ctime) == 0) {
          console.log(item.name+'文件被删除!')
        } else if(Date.parse(curr.mtime) != Date.parse(prev.mtime)) {
          fn(item)
        }
      })
    })
  }
  //观察变化，然后再修对应数据
  function rwatch(olist,oChang,fn) {
    for (let i = 0; i < olist.length; i++) {
      if(olist[i].path === oChang.path ){
        console.log('监测变化',oChang.name)
        if(olist === rCssData){
          fs.readFile(oChang.path, {flag: 'r+', encoding: 'utf8'},  (err, data) =>{
            olist[i].time = new Date();
            if(err) {
               console.log(err);
              olist[i].err = `\/* ${err} *\/`;
              olist[i].data = null;return;
            }
            olist[i].data = new CleanCSS(cassys).minify(data).styles;
            olist[i].err = null;
            fn()
          });
        }
        if(olist === rJsData){
          olist[i].time = new Date();
          try{
            let data=uglifyjs.minify(oChang.path).code;
            olist[i].data = data;
          }catch(err){
            olist[i].data = null;
            olist[i].err = `\/* ${err} *\/`
          }
        }
        break;
      }
    }
  }

  if(cssEntList || jsEntList){
    if(jsEntList){
      watchF(jsEntList,(oChang)=>{
        rwatch(rJsData,oChang,()=>{
          BY('js')
        })
      })
    }
    if(cssEntList){
      watchF(cssEntList,(oChang)=>{
        rwatch(rCssData,oChang,()=>{
          BY('css')
        })
      })
    }
  }else{
    fn({"state":0, "info": " _.json配置没有对文件编译需求" })
  }




// return uglifyjs.minify(fList).code;

}
