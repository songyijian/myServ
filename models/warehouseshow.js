const fs = require("fs");
const path = require("path");
const url = require("url");
const queryString = require("querystring");
const slash = require('slash');
const builderData = require("../set.json");


module.exports = (req, res, next, fn) => {
    let usePar=req.params
    //先过滤库
    let typey = builderData.ItemType.filter((item, index) => {   return item.id == usePar.typeid })
    if (typey.length === 0) {
        next();
        return;
    }
    let cky = typey[0].list.filter((item, index) => { return item.id == usePar.ckid })
    if (cky.length === 0) {
        next();
        return;
    }

    //文件路径处理
    let pathy = path.resolve( cky[0].path+"/"+usePar['0']);
        pathy = slash(pathy)

        // console.log(pathy)

    //忘记当时为什么这么写了？？？唉
    if ( !!path.parse(pathy).ext ) {
        next();return
    }

    fs.readdir(pathy, (err, data) => {
        let oerr = null,
            yData = { "data": data, 'config': null, "path": null };
        if (err) {
            oerr = err;
            return;
        }
        // console.log(data)

        //项目根目录判定
        if (data){
            data.forEach((item, index) => {
                if (item === "_.json") {
                    // const sjson = fs.readFileSync(`${pathy}/_.json`, "utf-8")
                        yData.config = true;
                        yData.path = `${pathy}`;
                    return
                }
            })
        }
        fn(oerr, yData)
    })
}