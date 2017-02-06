// 构建处理
const fs = require("fs");
const path = require("path");
const queryString = require("querystring");
const builderData = require("../set.json");
exports.builder = (req, res, next) => {
    let alldata = "";
    req.on("data", function(chunk) {
        alldata += chunk;
    });

    //全部传输完毕
    req.on("end", function() {
        let ajaxData = queryString.parse(alldata);
        let cpath = ajaxData.path.split(path.sep);

        let endData = {};
        console.log(cpath)

        if (ajaxData.type) {
            fs.stat(`${ajaxData.type}`, (err, stats) => {
                if (err) {
                    endData = {
                        "state": -1,
                        "err": `请检查${ajaxData.type}目录是否存在 || set配置是否正确？`
                    };
                    console.error(err);
                    res.send(endData)
                    return false;
                }

                fs.stat(`${ajaxData.type}/${cpath[0]}`, (err, stats) => {
                    if (err) {
                        console.log("不存在可以创建：",`${ajaxData.type}/${cpath[0]}`)
                        endData = {
                            "state": -1,
                            "iofn": `请检查${ajaxData.type}目录是否存在 || set配置是否正确？`
                        };
                        
                        res.send(endData)
                        return false;
                    }
                    // fs.stat(`${ajaxData.type}/${cpath[0]}`, (err, stats) => {
                    //     if (err) {
                    //         console.log("不存在可以创建：",`${ajaxData.type}/${cpath[0]}`)
                    //         endData = {
                    //             "state": -1,
                    //             "iofn": `请检查${ajaxData.type}目录是否存在 || set配置是否正确？`
                    //         };
                            
                    //         res.send(endData)
                    //         return false;
                    //     }
                    // })


                    res.send(endData)

                })




                res.send(endData)
            })
        }


        console.log("////", ajaxData);
    });

};