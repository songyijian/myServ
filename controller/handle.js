"use strict"
const fs = require('fs-extra');
const slash = require('slash');
const path = require("path")
const {creactFn}  = require("../models/createFile");
const { isDirCallFn, isFileCallFn, isFileUrl } = require("../models/func");


module.exports = {
    // 构建UI
    "renderIndex" :(req, res, next) => {
        res.render("index", req.__CONFIG__);
    },


    // 构建处理
    "creactGo" : (req, res, next) => {
        let ajaxData = req.body
        console.log( '请求创建信息----------------\n',  ajaxData )

        if (!ajaxData.istemp || !ajaxData.item_type_id || !ajaxData.filepath) {
            res.send({
                "state": 0,
                "info": '缺少必要参数'
            });
            return
        }
        if (ajaxData.istemp == 'true') {
            if (!ajaxData.template_id){
                res.send({
                    "state": 0,
                    "info": '缺少模版参数'
                });
                return
            }
        }
        if (ajaxData.istemp == 'false'){
            if (!isFileUrl(ajaxData.filepath)){
                res.send({
                    "state": 0,
                    "info": '路径应是合法的文件格式！'
                });
                return
            }
        }

        try {
            runs()
        } catch (error) {
            res.send({
                "state": 0,
                "info": '未知错误，创建失败请检查配置与参数',
                "err": error
            });
        }
        
        function runs(){
            //仓库地址
            var ckPath = req.__CONFIG__.item_type.filter(item => item.id == ajaxData.item_type_id)[0].path;
            //模版
            var tmItem = '';
            //组合后创建路径
            var newThisPath='';
            //文件名字加后缀
            var nameBase = '';
            if (ajaxData.istemp == "true") {
                newThisPath = slash(path.join(ckPath, ajaxData.filepath))
                tmItem = req.__CONFIG__.template.filter(item => item.id == ajaxData.template_id)[0] 
                console.log('模版创建模式---------')
            }else{
                nameBase = path.basename(ajaxData.filepath);
                let fp = path.join(ckPath, ajaxData.filepath);
                newThisPath = slash(fp.substr(0, fp.length - nameBase.length))
                tmItem = { "objs": [{ "name": nameBase, "template": ajaxData.ctxt }] }
                console.log('自定义文件创建模式--------')
            }
            console.log({ ckPath, newThisPath, nameBase, tmItem})

            //检查仓库的正确性
            isDirCallFn(ckPath, s => {
                if (!s) {
                    res.send({
                        "state": 0,
                        "info": `${ckItem.name}仓库path配置错误${ckPath}`
                    })
                    return
                }

                if (ajaxData.istemp == 'true'){
                    //检查项目是否存在
                    isDirCallFn(newThisPath, ds=> {
                        if (ds) {
                            res.send({
                                "state": 0,
                                "info": `项目已存在`
                            })
                            return
                        }
                        creactAll(newThisPath)
                    })
                }else{
                    //文件是否存在
                    let fUrl = path.resolve(newThisPath, nameBase);
                    isFileCallFn(fUrl,s=>{
                        if(s){
                            res.send({
                                "state": 0,
                                "info": `文件已存在:${fUrl}`
                            });
                            return
                        }
                        creactAll(newThisPath)
                    })
                }
                // 批量创建业务
                function creactAll(thisPath){
                    console.log('))))))',tmItem.objs)
                    let creactListLing = tmItem.objs.map(item => {
                        let obj = typeof (item) == 'string' 
                            ? { "src": slash(path.resolve(thisPath, item))}
                            : { "src": slash(path.resolve(thisPath, item.name)), "txt": item.template }
                        console.log('&&&&',obj)
                        return creactFn(obj)
                    }) 
                    Promise.all(creactListLing ).then(function (o) {
                        res.send({
                            "state": 1,
                            "info": `项目创建成功`
                        })
                    }).catch(function (err) {
                        res.send({
                            "state": 0,
                            "info": `创建失败`,
                            "info": err
                        })
                    })
                }
            })
        }  
    },


    //静态文件列表UI
    "warehouse" : (req, res, next) => {
        let { urlId,...Npath } = req.params;
        let Npaths = Npath['0'] //剩下的路径
        //这个url是否在库里
        let isCkUrl = req.__CONFIG__.item_type.filter(item => item.id == urlId)
        if (isCkUrl.length === 0) {
            next()
            return;
        }
        //读取对应库里的文件
        let pathy = slash(path.resolve(isCkUrl[0].path + "/" + Npaths));
        fs.readdir(pathy, (err, data) => {
            res.render("warehouse", {
                "err": err,
                "data": data
            })
        })
    },


    // //编译
    // "merge" : (req, res, next) => {
    //     // let ajaxData = "";
    //     // req.on("data", (data) => {  ajaxData += data })
    //     // req.on("end", () => {
    //     // })
    //     var itemPath = req.body;
    //     var itemJson = fs.readFileSync(`${itemPath}/_.json`, "utf-8")
    //     console.log("\n--------------- 当前项目配置表 ---------------");
    //     console.log(itemPath,typeof itemJson);
    //     merge.mergeFile(itemPath,itemJson, (datas) => {
    //         res.send(datas)
    //     })
    // },



    // //版本号
    // "staticv" : (req, res, next) => {
    //     // let ajaxData = "";
    //     // req.on("data", (data) => {  ajaxData += data })
    //     // req.on("end", () => {
    //     // })
    //     var itemPath = req.body;
    //     var itemJson = fs.readFileSync(`${itemPath}/_.json`, "utf-8")
    //     console.log("\n--------------- 当前项目配置表 ---------------");
    //     console.log(itemPath,itemJson);
    
    //     staticv.vFile(itemPath,itemJson, (datas) => {
    //         res.send(datas)
    //     })
    // }
}



