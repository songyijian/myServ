const path = require("path")
const queryString = require("querystring")
const fs = require('fs-extra')
const slash = require('slash')

exports.vFile = (itemPath,itemJson, endfn) => {
  /*itemPath 项目路径   ,itemJson 配置表*/
  var oitemJson = null;
  try{
    oitemJson=JSON.parse(itemJson)
  }catch(err){
    console.log('\n----------- _.json文件不被能被解析 XX ------------')
    conso.log(err)
    endfn({ "state":0, "info": "_.json文件不被能被解析请检查后再试" , err })
    return
  }

  // console.log(oitemJson,oitemJson.edition)

  function addvfn(str,fn){
    var t=new Date().getTime();
    var re=/\.js\?v=\d+|\.css\?v=\d+|\.jpg\?v=\d+|\.img\?v=\d+|\.png\?v=\d+|\.gif\?v=\d+|\.html\?v=\d+|\.jpg|\.JPG|\.png|\.gif|\.css[^(]|\.js|\.html[^(]/ig;
    var vdata = str.replace(re,function(a0,a1,s){
      // console.log(a0,a1,s)
      if(/\.js\?v=\d+|\.css\?v=\d+|\.jpg\?v=\d+|\.img\?v=\d+|\.png\?v=\d+|\.gif\?v=\d+|\.html\?v=\d+/ig.test(a0)){return a0.replace(/\d+/,t) }
      if(a0==='.html"'||a0===".html'"){
        return '.html?v='+t+a0[a0.length-1];
      }
      if(a0==='.css"'||a0===".css'"){
        return '.css?v='+t+a0[a0.length-1];
      } 
      return a0+'?v='+t; 
    })
    fn(vdata)
  }

  if(oitemJson.edition){

    var vfn = oitemJson.edition.map((item,inde)=>{
      let paths =  slash(path.resolve(itemPath+'/'+item))
      return new Promise((resolve,reject)=>{
          fs.readFile(paths, {flag: 'r+', encoding: 'utf8'},  (err, data) =>{
            if(err) {
              reject(err); return
            }
            addvfn(data,(vdata)=>{
              fs.outputFile(paths, vdata , (err)=>{
                if(err){ reject(err); return }
                resolve(`${item}处理成功`)
              })
            })
          })
      })
    })

    Promise.all(vfn).then(function(o) {
      console.log(`\n----------- 添加版本号完成 Y ------------ `)
      console.log(o)
      endfn({ "state":1, "info": `${o}` })
    }).catch(function(err) {
      console.log(`\n----------- 添加版本号错误 xx ------------ `)
      console.log(err)
      endfn({ "state":0, "info": "文件处理错误" , err })
    })
  }else{
    console.log(`\n----------- 添加版本号错误 xx ------------ `)
    console.log('_.json 配置错误，没有找到edition对象')
    endfn({ "state":0, "info": "_.json 配置错误，没有找到edition对象"  })
  }

}
