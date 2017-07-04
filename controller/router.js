"use strict"
const queryString = require("querystring");
const path = require("path");
const fs = require('fs-extra');
const slash = require('slash');

const builder = require("../models/builder");
const warehouseshow = require("../models/warehouseshow");
const merge = require("../models/merge");
const staticv= require("../models/staticv");



const setData = require("../set.json");
// console.log(setData)

// 构建UI
exports.buildershow = (req, res, next) => {
    res.render("builder", setData);
}

// 构建处理
exports.builder = (req, res, next) => {
    let alldata = "";
    req.on("data", function(chunk) { alldata += chunk; });
    req.on("end", () => {
        let ajaxData = queryString.parse(alldata);
        console.log(ajaxData);

        if (!ajaxData.changkupath || !ajaxData.filepath || !ajaxData.mbid) {
            res.send({
                "state":0,
                "info": '参数错误'
            });
            return;
        };

        //项目检查
        fs.access(ajaxData.changkupath, fs.constants.R_OK | fs.constants.W_OK, (err)=>{
            if (err) {
                res.send({
                    "state": 0,
                    "info": `请检查${ajaxData.changkupath}仓库是否存在 || set配置是否正确？`
                })
                return;
            }
            let goujianfile = slash(`${ajaxData.changkupath}/${ajaxData.filepath}`);
            fs.readdir(goujianfile, (err, data) => {
                if (err || !data || data.length === 0) {
                    console.log("开始构建---");
                    builder.builder(req, res, next, ajaxData);
                    return false;
                }
                console.log("项目已存在构建取消 xx")
                res.send({
                    "state": 0,
                    "info": `该项目已经存在 - ${goujianfile}`
                })
            })
        })

    })
}


//静态文件列表UI
exports.warehouse = (req, res, next)=>{
    warehouseshow(req, res, next, (err, data) => {
        res.render("warehouse", { "err": err, "data": data })
    })
}


//编译
exports.merge = (req, res, next) => {
    let ajaxData = "";
    req.on("data", (data) => {  ajaxData += data })
    req.on("end", () => {
        ajaxData = queryString.parse(ajaxData);
        console.log("当前项目配置表：",ajaxData);
        merge.mergeFile(ajaxData, (datas) => {
            res.send(datas)
        })
    })
}


//版本号
exports.staticv = (req, res, next) => {
    let ajaxData = "";
    req.on("data", (data) => {  ajaxData += data })
    req.on("end", () => {
        ajaxData = queryString.parse(ajaxData);
        console.log("当前项目配置表：",ajaxData);

        staticv.vFile(ajaxData, function (datas) {
            res.send(datas)
        })
    })
}