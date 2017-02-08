"use strict"
const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();

//'http://test.go.163.com/go/2017/0106/honor/index.html'
module.exports.getHtml = (sget, fn) => {
    http.get(sget, (res) => {
        let data,
            html;
        res.on("data", (data) => {
            html += data;
        })
        res.on("end", (data) => {

            fn(null, html)
        })
    }).on('error', (err) => {
        if (err) {
            fn(`爬虫死掉了！因为：${err}`, null)
            console.log(`爬虫死掉了！因为：${err}`)
        }
    });
}