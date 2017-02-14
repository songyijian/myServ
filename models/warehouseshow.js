// 构建处理 
const fs = require("fs");
const path = require("path");
const url = require("url");
const queryString = require("querystring");
const builderData = require("../set.json");
const merge = require("./merge.js");
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
                    const c = fs.readFileSync(`${pathy}/_.json`, "utf-8")
                    yData.v = c ? c : null;
                    let getD = JSON.parse(yData.v);

                    if (getD.js.list && getD.js.min) {
                        getD.js.list.forEach((item, index) => {
                            merge.mergeJS(`${pathy}/${item}`, `${pathy}/${getD.js.min}`, getD.js.list, `${pathy}`)
                        })
                    }

                    if (getD.css.list && getD.css.min) {
                        getD.css.list.forEach((item, index) => {
                            merge.mergeCSS(`${pathy}/${item}`, `${pathy}/${getD.css.min}`, getD.css.list, `${pathy}`)
                        })
                    }

                    return
                }
            })

        fn(oerr, yData)
    })





};