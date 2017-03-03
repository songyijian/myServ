"use strict"
const queryString = require("querystring");
const path = require("path");
const setData = require("../models/buildershow.js");
const builder = require("../models/builder.js");
const warehouse = require("../models/warehouseshow.js");
const merge = require("../models/merge.js");
const slash = require('slash');

// 构建UI
exports.buildershow = (req, res, next) => {
    res.render("builder", setData.builderData);
};

// 构建处理
exports.builder = (req, res, next) => {
    let alldata = "";
    //get 数据
    req.on("data", function(chunk) { alldata += chunk; });
    req.on("end", () => {
        let ajaxData = queryString.parse(alldata);
        console.log(ajaxData);
        //let cpath = ajaxData.path.split(path.sep);
        if (ajaxData.changkupath && ajaxData.changkuid && ajaxData.filepath && ajaxData.mbid) {
            res.send({
                "state": -1,
                "info": '参数错误'
            });
            return;
        };

        //项目检查
        fs.access(`${ajaxData.changkupath}`, fs.constants.R_OK | fs.constants.W_OK, err => {
            if (err) {
                endData = {
                    "state": -1,
                    "info": `请检查${ajaxData.changkupath}仓库是否存在 || set配置是否正确？`
                };
                res.send(endData)
                return;
            }
            let goujianfile = slash(`${ajaxData.changkupath}/${ajaxData.changkuid}`)

            fs.readdir(goujianfile, (err, data) => {
                if (err || !data || data.length === 0) {
                    console.log("开始构建---");
                    // mkdirFn(cpath, req, res)
                    builder.builder(req, res, next, ajaxData, cpath);
                    return false;
                }
                console.log("项目已存在构建取消 xx")
                res.send({
                    "state": -1,
                    "info": `该项目已经存在 - ${goujianfile}`
                })
            })
        });


    });
};

// exports.builder = (req, res, next) => {
//     builder.builder(req, res, next)
// };

//静态UI 
exports.warehouse = (req, res, next) => {
    warehouse.warehouseshow(req, res, next, (err, data) => {
        res.render("warehouse", { "err": err, "data": data });
    })
};
//编译
exports.merge = (req, res, next) => {
    let ajaxData = "";
    req.on("data", (data) => {
        ajaxData += data;
    })
    req.on("end", () => {
        ajaxData = queryString.parse(ajaxData);

        merge.mergeFile(ajaxData, (err, data) => {

            res.end("1")
        })
    })
};