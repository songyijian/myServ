"use strict"
const fs = require('fs-extra');
const slash = require('slash');
const path = require("path")
const { creactFn } = require("../models/createFile");

module.exports = {
    // 构建UI
    "renderIndex" :(req, res, next) => {
        res.render("index", req.__CONFIG__);
    },


    // 构建处理
    "creactGo" : (req, res, next) => {
        let ajaxData = req.body
        console.log('项目创建信息：', ajaxData)
        if (!ajaxData.item_type_id || !ajaxData.filepath || !ajaxData.template_id) {
            res.send({
                "state": 0,
                "info": '参数错误'
            });
            return
        }
        let ckItem = req.__CONFIG__.item_type.filter(item => item.id == ajaxData.item_type_id)[0]
        let tmItem = req.__CONFIG__.template.filter(item => item.id == ajaxData.template_id)[0]

        //检查仓库的正确性
        fs.access(ckItem.path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (err) {
                res.send({
                    "state": 0,
                    "info": `${ckItem.name}仓库path配置错误${ckItem.path}`
                })
                return
            }
            let cjPath = slash(`${ckItem.path}/${ajaxData.filepath}`);
            //检查项目是否存在
            fs.access(cjPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
                if (err) {
                    creactFn(cjPath, tmItem).then(function (o) {
                        res.send({
                            "state": 1,
                            "info": `项目创建成功`
                        })
                    }).catch(function (err) {
                        res.send({
                            "state": 0,
                            "info": err
                        })
                    })
                } else {
                    res.send({
                        "state": 0,
                        "info": `项目已存在`
                    })
                }
            })


            try {
  
            } catch (error) {
                res.send({
                    "state": 0,
                    "info": err
                })
            }

        })


        // fs.access(ajaxData.changkupath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        //     if (err) {
        //         res.send({
        //             "state": 0,
        //             "info": `请检查${ajaxData.changkupath}仓库是否存在 || set配置是否正确？`
        //         })
        //         return;
        //     }
        //     let ckuPath = slash(`${ajaxData.changkupath}/${ajaxData.filepath}`);
        //     fs.readdir(ckuPath, (err, data) => {
        //         if (err || !data || data.length === 0) {
        //             console.log("\n--------- 开始构建 ---------");
        //             builder.builder(req, res, next, ajaxData)
        //             return
        //         }
        //         console.log("\n---------  项目已存在构建取消 xx ---------")
        //         res.send({
        //             "state": 0,
        //             "info": `该项目已经存在 - ${ckuPath}`
        //         })
        //     })
        // })
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
            let yData = { "data": data, 'config': null, "path": null };
            res.render("warehouse", { "err": err, "data": yData })
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



