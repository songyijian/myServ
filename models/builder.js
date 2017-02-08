// 构建处理 
const fs = require("fs");
const path = require("path");
const queryString = require("querystring");
const builderData = require("../set.json");
const getDom = require("./getDom.js");


let xr = "xr";

exports.builder = (req, res, next) => {
    let alldata = "";
    let endData = {};

    //get 数据
    req.on("data", function(chunk) {
        alldata += chunk;
    });
    req.on("end", dataEND);


    function dataEND() {
        let ajaxData = queryString.parse(alldata);
        let cpath = ajaxData.path.split(path.sep);
        console.log(cpath)
        if (!ajaxData.type) { return false; }

        //项目检查
        fs.access(`${ajaxData.type}`, fs.constants.R_OK | fs.constants.W_OK, err => {
            if (err) {
                endData = {
                    "state": -1,
                    "info": `请检查${ajaxData.type}仓库是否存在 || set配置是否正确？`
                };
                console.error(endData, err);
                res.send(endData)
                return false;
            }

            fs.readdir(`${ajaxData.type}/${ajaxData.path}`, (err, data) => {
                if (err || !data || data.length === 0) {
                    console.log("没有项目可以构建")
                    mkdirFn(cpath, req, res)
                    return false;
                }
                //console.log('该项目已经存在')
                res.send({
                    "state": -1,
                    "info": `${ajaxData.type}/${ajaxData.path} 该项目已经存在`
                })
            })
        })
        console.log("//", ajaxData);

        //构建目录层
        function mkdirFn(arr, req, res) {
            let p = '',
                array = arr,
                y = false;

            (function dg(i) {
                var item = null;
                if (i > array.length - 1) {
                    mkworkFn(req, res)
                    return false;
                }
                item = `${array[i]}`;
                p += `/${item}`;
                fs.access(`${ajaxData.type}${p}`, fs.constants.R_OK | fs.constants.W_OK, err => {
                    if (err) {
                        fs.mkdir(`${ajaxData.type}${p}`, err => {
                            if (err) {
                                endData = {
                                    "state": -1,
                                    "info": `${ajaxData.type}${p}`
                                };
                                res.send(endData)
                            } else {
                                i++;
                                dg(i);
                            }
                        })
                    } else {
                        i++;
                        dg(i);
                    }
                })
            })(0);
        }




        //构建项目内容
        function mkworkFn(req, res) {
            let infoOut = ''
            let mData = builderData.template.filter((item) => {
                return item.mb_id == ajaxData.mold
            });
            let md = mData[0].structure;

            (function dg(i) {
                if (i > md.length - 1) {
                    res.send(endData)
                    return false;
                }
                let item = md[i];
                let url = '';
                if (typeof item === "string") {
                    url = `${ajaxData.type}/${ajaxData.path}/${item}`
                    cMk(url, err => {
                        if (err) {
                            infoOut += `${ url } 创建失败,`;
                            endData = { "state": -1, info: infoOut }
                        }
                        i++;
                        dg(i)
                    })
                } else {
                    url = `${ajaxData.type}/${ajaxData.path}/${item.name}`;

                    if (item.get) {
                        cMk(url, `${item.get}`, err => {
                            if (err) {
                                infoOut += `${ url } 创建失败,`;
                                endData = { "state": -1, info: infoOut }
                            }
                            i++;
                            dg(i)
                        })
                    }
                }
            })(0)


            function cMk(url, get, fn) {
                if (arguments.length < 3) {
                    fn = get
                }
                if (path.extname(url) == '') {
                    let u = url;
                    fs.mkdir(url, err => {
                        fn(err)
                    })
                } else {
                    if (arguments.length === 3) {
                        getDom.getHtml(get, (err, data) => {
                            if (err) {
                                infoOut += `${ url } 创建失败,`;
                                endData = { "state": -1, info: infoOut }
                            }
                            xr = data;
                            fs.writeFile(`${ url }`, xr, 'utf8', err => {
                                fn(err)
                            })
                        })
                        return false;
                    }
                    fs.writeFile(`${ url }`, xr, 'utf8', err => {
                        fn(err)
                    })
                }
            }


        }
    }

};