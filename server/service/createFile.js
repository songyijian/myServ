const path = require("path")
const fs = require('fs-extra')
const slash = require('slash')

//创建目录
exports.creactArray = (newThisPath, templist) => {
    function isFile(url) { return path.extname(slash(url)).length > 1 }
    return templist.map(item => {
        let src = '';
        let txt = '';
        new Promise((yes,no)=>{
            if (typeof (item) == 'string') {
                src = slash(path.resolve(newThisPath, item))
            }else{
                src = slash(path.resolve(newThisPath, item.name));
                txt = item.template || false;
            }
            if(isFile(src)){
                fs.outputFile(src, txt, err => {
                    err ? no(err) : yes()
                })
            }else{
                fs.ensureDir(src,  err=>{
                    err ? no(err) : yes()
                });
            }
        })
    })
}
