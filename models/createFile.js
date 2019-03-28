const path = require("path")
const fs = require('fs-extra')
const slash = require('slash')
// const configData = require("../config")
// const getDom = require("./getDom.js")


exports.creactFn = (fUrl,templateObj)=>{
    
    let dirGo = templateObj.objs.map(item=>{
        return new Promise((resolve, reject)=>{
            // let hz = path.extname( _df ).length
            
            //字符串，创建路径
            if(typeof(item)=='string'){
                let _df = slash(fUrl+'/'+item)
                fs.ensureDir(_df, function(err) {
                    err ? reject(err) : resolve()
                });
            }else{
                //创建文件
                let _df = slash(fUrl+'/'+item.name)
                fs.ensureFile(_df, function(err) {
                    if(err){
                        reject(err)
                    }else{
                        fs.outputFile(_df,item.template,function(err) {
                            err ? reject(err) : resolve()
                        })
                        resolve()
                    }
                });
            }
        })
    })  

    return Promise.all(dirGo)
    // .then(function(o) { 
    //     res.send({
    //         "state": 1,
    //         "info": `项目创建成功`
    //     })
    // }).catch(function(err) {
    //     res.send({
    //         "state": 0,
    //         "info": err
    //     })
    // })
}


// exports.builder = (req, res, next, ajaxData) => {
//     let gjPath = slash(`${ajaxData.changkupath}/${ajaxData.filepath}`);
//     //构建
//     var oMb = configData.template.filter((item,index)=>{
//         return item.mb_id == ajaxData.mbid
//     })
    
//     var dirGo = oMb[0].structure.map((item,index)=>{
//         if(typeof item !=='object'){
//             let p=slash(gjPath+'/'+item);
//             if(!path.extname(p).length){
//                 return new Promise((resolve, reject)=>{
//                     fs.ensureDir(p, function(err) {
//                         if(err){
//                             reject(err)
//                         }else{
//                             resolve()
//                         }
//                     });
//                 })
//             }else{
//                 return new Promise((resolve, reject)=>{
//                     fs.ensureFile(p, function(err) {
//                         if(err){
//                             reject(err)
//                         }else{
//                             resolve()
//                         }
//                     });
//                 })
//             }
//         }

//         if(typeof item =='object'){
//             let pf=slash(gjPath+'/'+item.name);
//             return new Promise((resolve, reject)=>{
//                 fs.ensureFile(pf, function(err) {
//                     if(err){
//                         reject(err)
//                     }else{
//                         if(item.get){
//                             getDom.getHtml(item.get, (err, data) => {
//                                 fs.outputFile(pf,data, function(err) {
//                                     if(!err){
//                                        resolve()
//                                     }else{
//                                         reject(err)
//                                     }
//                                 })
//                             })
//                         }
//                         if(item.template){
//                             fs.outputFile(pf,item.template, function(err) {
//                                 if(!err){
//                                     resolve()
//                                 }else{
//                                     reject(err)
//                                 }
//                             })
//                         }
//                     }
//                 });
//             })
//         }
//     })

//     Promise.all(dirGo).then(function(o) { 
//         res.send({
//             "state": 1,
//             "info": `项目创建成功`
//         })
//     }).catch(function(err) {
//         res.send({
//             "state": 0,
//             "info": err
//         })
//     })
// }