"use strict"
const fs = require('fs-extra')
const slash = require('slash')
const path = require("path")
const {
    creactArray
} = require("../model/createFile")
const {
    isDirCallFn,
} = require("../model/func")

module.exports = {
    // 构建UI
    renderIndex: (req, res, next) => {
        res.render("index", req.__CONFIG__)
    },

    // 构建项目模版
    creactTemplate: (req, res, next) => {
        try {
            let {
                filepath,
                item_type_id,
                template_id
            } = req.body;

            if (!template_id || !item_type_id || !filepath) {
                res.send({
                    state: 0,
                    msg: '缺少必要参数'
                });
                return
            }
            console.log('请求创建信息------\n', req.body)
            //仓库地址
            let oItem = req.__CONFIG__.item_type.filter(item => item.id == item_type_id)[0];
            let ckPath = oItem.path;

            let tmItem = req.__CONFIG__.template.filter(item => item.id == template_id)[0].objs;
            let newThisPath = slash(path.join(ckPath, filepath))

            console.log(ckPath)
            console.log(tmItem)
            console.log(newThisPath)

            //检查仓库的正确性
            isDirCallFn(ckPath, s => {
                if (!s) {
                    res.send({
                        state: 0,
                        msg: `${ckItem.name}仓库path配置错误${ckPath}`,
                        error: `${ckItem.name}仓库path配置错误${ckPath}`
                    })
                    return
                }
                //检查项目是否存在
                isDirCallFn(newThisPath, ds => {
                    if (ds) {
                        res.send({
                            state: 0,
                            msg: `项目已存在`
                        })
                        return
                    }
                    console.log('开始创建...')
                    //创建项目
                    Promise.all(creactArray(newThisPath, tmItem)).then(function (o) {
                        console.log('y 项目创建成功!')
                        res.send({
                            state: 200,
                            msg: `项目创建成功`,
                            data:{
                                itemPath: newThisPath,
                                url: slash(path.join(oItem.id, filepath))
                            }
                        })
                    }).catch(function (error) {
                        console.log('x 创建失败!')
                        res.send({
                            state: 0,
                            msg: `创建失败`,
                            error
                        })
                    })
                })
            })
        } catch (error) {
            res.send({
                state: 0,
                msg: '未知错误，创建失败请检查配置与参数',
                error
            })
        }
    },


    //静态文件列表UI
    warehouse: (req, res, next) => {
        let {
            urlId,
            ...Npath
        } = req.params;
        let Npaths = Npath['0'] //剩下的路径
        //这个url是否在库里
        let isCkUrl = req.__CONFIG__.item_type.filter(item => item.id == urlId)
        if (isCkUrl.length === 0) {
            next()
            return;
        }
        //读取对应库里的文件
        let pathy = slash(path.resolve(isCkUrl[0].path + "/" + Npaths));
        fs.readdir(pathy, (error, data) => {
            res.render("warehouse", {
                err: error,
                data,
                pathy
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
