const path = require("path")
const fs = require('fs-extra')
const slash = require('slash')
// const queryString = require("querystring")
const builderData = require("../set.json")
const getDom = require("./getDom.js")

exports.builder = (req, res, next, ajaxData) => {
    let endData = {};
    let gjPath = slash(`${ajaxData.changkupath}/${ajaxData.filepath}`);
    //构建
    var oMb = builderData.template.filter((item,index)=>{
        return item.mb_id == ajaxData.mbid
    })

    var dirGo = oMb[0].structure.map((item,index)=>{
        if(typeof item !=='object'){
            let p=slash(gjPath+'/'+item);
            // console.log(p)
            if(!path.extname(p).length){
                return new Promise((resolve, reject)=>{
                    fs.ensureDir(p, function(err) {
                        if(err){
                            reject(err)
                        }else{
                            resolve()
                        }
                    });
                })
            }else{
                return new Promise((resolve, reject)=>{
                    fs.ensureFile(p, function(err) {
                        if(err){
                            reject(err)
                        }else{
                            resolve()
                        }
                    });
                })
            }
        }

        if(typeof item =='object'){
            let pf=slash(gjPath+'/'+item.name);
            return new Promise((resolve, reject)=>{
                fs.ensureFile(pf, function(err) {
                    if(err){
                        reject(err)
                    }else{
                        if(item.get){
                            getDom.getHtml(item.get, (err, data) => {
                                fs.outputFile(pf,data, function(err) {
                                    if(!err){
                                       resolve()
                                    }else{
                                        reject(err)
                                    }
                                })
                            })
                        }
                        if(item.template){
                            fs.outputFile(pf,item.template, function(err) {
                                if(!err){
                                    resolve()
                                }else{
                                    reject(err)
                                }
                            })
                        }
                    }
                });
            })
        }
    })

    Promise.all(dirGo).then(function(o) { 
        res.send({
            "state": 1,
            "info": `项目创建成功`
        })
    }).catch(function(err) {
        res.send({
            "state": 0,
            "info": err
        })
    })
}