"use strict"

const file = require("../models/file.js");


exports.builder = (req, res, next) => {
    res.render("builder", {
        "albumname": [],
        "images": []
    });
}