const path = require("path")
const queryString = require("querystring")
const fs = require('fs-extra')
const slash = require('slash')


exports.vFile = (ajaxData, endfn) => {
  let pPath = ajaxData.path;
  let _jp = null;
  try{
    _jp=JSON.parse(ajaxData.config).edition
  }catch(err){
    console.log(err)
    endfn({ "state":0, "info": "_.json配置错误 || 不是正确的json文件" , err });
    return
  }

  function addvfn(str,fn){
    var t=new Date().getTime();
    var re=/\.js\?v=\d+|\.css\?v=\d+|\.jpg\?v=\d+|\.img\?v=\d+|\.png\?v=\d+|\.gif\?v=\d+|\.jpg|\.JPG|\.png|\.gif|\.css|\.js/ig;
    var vdata = str.replace(re,function(a0,a1,s){
      if(/\.js\?v=\d+|\.css\?v=\d+|\.jpg\?v=\d+|\.img\?v=\d+|\.png\?v=\d+|\.gif\?v=\d+/ig.test(a0)){return a0.replace(/\d+/,t) } 
      return a0+'?v='+t; 
    })
    fn(vdata)
  }

  var vfn = _jp.map((item,inde,array)=>{
    let paths =  slash(path.resolve(pPath+'/'+item))
    // console.log(paths)
    return new Promise((resolve,reject)=>{
        //du
        fs.readFile(paths, {flag: 'r+', encoding: 'utf8'},  (err, data) =>{
          if(err) {
            reject(err);
            return;
          }
          //chuli xieru
          addvfn(data,(vdata)=>{
            fs.outputFile(paths, vdata , (err)=>{
              if(err){ reject(err); return }
              resolve(`${paths}处理成功！`)
            })
          })
        })
    })
  })

  Promise.all(vfn).then(function(o) {
    endfn({ "state":1, "info": `${o}` })
  }).catch(function(err) {
    console.log(`_this err ${err}`)
    endfn({ "state":0, "info": "文件处理错误" , err })
  })
}
