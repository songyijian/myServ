"use strict"
const fs = require('fs-extra');
const slash = require('slash');
const path = require("path")
const {creactArray}  = require("../model/createFile");
const { isDirCallFn, isFileCallFn, isFileUrl } = require("../model/func");

module.exports = {
    // 构建UI
    "renderIndex" :(req, res, next) => {
        res.render("index", req.__CONFIG__);
    },
    
    
    // 创建自定义文件
    "creactFliteGo": (req, res, next) => {
        try {
            let { filepath, item_type_id, ctxt } = req.body;
            console.log('请求创建信息----------------\n', req.body)
            if (!filepath || !item_type_id || !ctxt ) {
                res.send({
                    "state": 0,
                    "info": '缺少必要参数'
                });
                return
            }
            if (!isFileUrl(filepath)) {
                res.send({
                    "state": 0,
                    "info": '路径应是合法的文件格式！'
                });
                return
            }
            let ckPath = req.__CONFIG__.item_type.filter(item => item.id == item_type_id)[0].path;
            let newThisPath = slash(path.join(ckPath, filepath))
            console.log('创建路径----------------\n', newThisPath)
            isFileCallFn(newThisPath,s=>{
                if (s){
                    res.send({
                        "state": 0,
                        "info": `文件已存在！${newThisPath}`
                    });
                }else{
                    fs.outputFile(newThisPath, ctxt, function (err) {
                        if (err){
                            console.log('创建失败！',err)
                            res.send({ "state": 0, "info": `创建失败${newThisPath}`,err})
                        }else{
                            console.log('创建成功！', newThisPath)
                            res.send({ "state": 1, "info": `创建成功！${newThisPath}` });
                        }
                    })
                }
            })
        } catch (error) {
            res.send({
                "state": 0,
                "info": '失败！未知错误！',
                error
            });
        }
    },


    // 构建项目模版
    "creactTemplateGo": (req, res, next) => {
        try {
            let { filepath, item_type_id, template_id } = req.body;

            if (!template_id || !item_type_id || !filepath) {
                res.send({
                    "state": 0,
                    "info": '缺少必要参数'
                });
                return
            }
            console.log('请求创建信息----------------\n', req.body)
            //仓库地址
            let ckPath = req.__CONFIG__.item_type.filter(item => item.id==item_type_id)[0].path;
            let tmItem = req.__CONFIG__.template.filter(item => item.id==template_id)[0].objs;
            let newThisPath = slash(path.join(ckPath, filepath)) 
            //检查仓库的正确性
            isDirCallFn(ckPath, s => {
                if (!s) {
                    res.send({
                        "state": 0,
                        "info": `${ckItem.name}仓库path配置错误${ckPath}`
                    })
                    return
                }
                //检查项目是否存在
                isDirCallFn(newThisPath, ds => {
                    if (ds) {
                        res.send({
                            "state": 0,
                            "info": `项目已存在`
                        })
                        return
                    }
                    console.log('-------', newThisPath, tmItem)
                    //创建项目
                    Promise.all(creactArray(newThisPath,tmItem)).then(function (o) {
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
                })
            })
        } catch (error) {
            res.send({
                "state": 0,
                "info": '未知错误，创建失败请检查配置与参数',
                "err": error
            });
            
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



