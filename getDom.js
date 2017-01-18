"use strict"

const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();




http.get('http://test.go.163.com/go/2017/0106/honor/index.html', (res) => {
    let html = '';


    res.on("data", (data) => {
        html += data;
    })


    res.on("end", (data) => {
        console.log(typeof html)

        fs.writeFile('index.html', html, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('写入成功');
        });

    })


}).on('error', () => {
    console.log("err")
});