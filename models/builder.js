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
        if (!ajaxData.type) { return false; }

        fs.access(`${ajaxData.type}`, fs.constants.R_OK | fs.constants.W_OK, err => {
            if (err) {
                endData = {
                    "state": -1,
                    "err": `请检查${ajaxData.type}目录是否存在 || set配置是否正确？`
                };
                console.error(endData, err);
                res.send(endData)
                return false;
            }
            // console.log(`${ajaxData.type}`,"文件存在")

            fs.access(`${ajaxData.type}/${ajaxData.path}`, fs.constants.R_OK | fs.constants.W_OK, err => {
                if (err) {
                    mrFn(cpath, req, res)
                    console.log(`${ajaxData.type}/${ajaxData.path}`, "文件不存在")
                    return false;
                }

                console.log(`${ajaxData.type}/${ajaxData.path}`, "文件存在")
                endData = {
                    "state": -1,
                    "iofn": `${ajaxData.type}/${ajaxData.path} 该项目已经存在`
                };
                res.send(endData)
            })
        })


        console.log("//", ajaxData);

        function mrFn(array, req, res) {
            let p = '';
            let y = false;
            //let i = 0;
            (function dg(i) {
                if (i > array.length - 1) {
                    return false;
                }
                p += `/${array[i]}`;
                console.log(i, `${array[i]}`, `${ajaxData.type}${p}`)

                fs.access(`${ajaxData.type}${p}`, fs.constants.R_OK | fs.constants.W_OK, err => {
                    if (err) {
                        // fs.mkdir(`${ajaxData.type}${array[i]}`, `${array[i]}`, err => {
                        //     if (err) {
                        //         endData = {
                        //             "state": 1,
                        //             "info": `${ajaxData.type}${array[i]}`
                        //         };
                        //         res.send(endData)
                        //     }
                        //     dg(i++)
                        // })
                    }
                    i++;
                    dg(i);
                })
            })(0);


        }

    });

};