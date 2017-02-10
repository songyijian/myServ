"use strict"
const queryString = require("querystring");
const setData = require("../models/buildershow.js");
const builder = require("../models/builder.js");
const warehouse = require("../models/warehouseshow.js");
// 构建UI
exports.buildershow = (req, res, next) => {
    res.render("builder", setData.builderData);
};

// 构建处理
exports.builder = (req, res, next) => {
    builder.builder(req, res, next)
};

//静态UI 
exports.warehouse = (req, res, next) => {
    warehouse.warehouseshow(req, res, next, (err, data) => {
        res.render("warehouse", { "err": err, "data": data });
    })
};