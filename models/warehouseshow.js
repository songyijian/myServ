// 构建处理 
const fs = require("fs");
const path = require("path");
const url = require("url");
const queryString = require("querystring");
const builderData = require("../set.json");
const slash = require('slash');


exports.warehouseshow = (req, res, next, fn) => {
    var rendData = {}
    let type = req.params["typeid"];
    let ck = req.params["ckid"];
    let urls = url.parse(req.url).pathname;
    let aurl = urls.split("/")

    let typey = builderData.ItemType.filter((item, index) => {
        return item.id == type;
    })
    if (typey.length === 0) {
        next();
        return;
    }

    let cky = typey[0].list.filter((item, index) => {
        return item.id == ck;
    })
    if (cky.length === 0) {
        next();
        return;
    }
    //路径处理
    let pathy = cky[0].path;
    let curl = '';
    aurl.forEach((item, index) => {
        if (index > 2 && item !== '') {
            curl += `/${item}`
        }
    })
    pathy += curl;
    pathy = slash(pathy)

    if (path.parse(`${pathy}`).ext) {
        next()
        return;
    }

    fs.readdir(`${pathy}`, (err, data) => {
        let oerr = null;
        let yData = { "data": data, 'v': null };
        if (err) {
            oerr = err;
        }
        //项目根目录判定
        if (data)
            data.forEach((item, index) => {
                if (item === "_.json") {
                    console.log(`${pathy}/_.json`)
                    const c = fs.readFileSync(`${pathy}/_.json`)
                    yData.v = c ? c : null;
                    return
                }
            })
        console.log(oerr, yData)
        fn(oerr, yData)
    })

};