// 构建处理 
const fs = require("fs");
const path = require("path");
const queryString = require("querystring");
const builderData = require("../set.json");
exports.builder = (req, res, next) => {
    let alldata = "";
    let endData = {};
    //get 数据
    req.on("data", function(chunk) {
        alldata += chunk;
    });

    //全部传输完毕
    req.on("end", function() {
        let ajaxData = queryString.parse(alldata);
        let cpath = ajaxData.path.split(path.sep);
        console.log(cpath)

        if (ajaxData.type) {
            fs.access(ajaxData.type, err => {
                if (!err) {
                    endData = {
                        "state": -1,
                        "err": `请检查${ajaxData.type}目录是否存在 || set配置是否正确？`
                    };
                    console.error(err);
                    res.send(endData)
                    return false;
                }
                fs.stat(`${ajaxData.type}/${ajaxData.path}`, (err, stats) => {
                    if (err) {
                        mrFn(cpath, req, res)
                        return false;
                    }
                    endData = {
                        "state": -1,
                        "iofn": `${ajaxData.type}/${ajaxData.path} 该项目已经存在`
                    };
                    res.send(endData)
                })
                res.send(endData)
            })
        }
        console.log("//", ajaxData);

        function mrFn(array, req, res) {
            let p = '';
            let y = false;
            array.forEach(function(element, index) {
                p += element;
                fs.stat(`${ajaxData.type}/${p}`, (err, stats) => {
                    if (err) {
                        fs.mkdir(`${ajaxData.type}/${p}`, element, err => {
                            if (err) {
                                endData = {
                                    "state": -1,
                                    "err": `${ajaxData.type}/${p} 抱歉构建失败 `
                                };
                                console.error(err);
                                res.send(endData)
                                return false;
                            }

                            endData = {
                                "state": 1,
                                "info": `${ajaxData.type}/${p}`
                            };
                            res.send(endData)
                        })
                    }
                })
            }, this);
        }

    });

};