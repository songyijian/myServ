"use strict"
const file = require("../models/file.js");
const queryString = require("querystring");
const setData = require("../models/buildershow.js");
const builder = require("../models/builder.js");

// 构建UI
exports.buildershow = (req, res, next) => {
    res.render("builder", setData.builderData);
};

// 构建处理
exports.builder = (req, res, next) => {
    builder.builder(req, res, next)
};