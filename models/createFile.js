const path = require("path")
const fs = require('fs-extra')

exports.creactFn = (obj)=>{
    new Promise((resolve, reject)=>{
        let isDir = path.extname(obj.src).length < 1;
        let { src } = obj.src;
        console.log('创建...',obj)
        if (isDir) {
            //创建路径
            fs.ensureDir(src, function(err) {
                err ? reject(err) : resolve()
            });
        }else{
            //创建文件
            fs.ensureFile(src, function(err) {
                if(err){
                    reject(err)
                }else{
                    if (obj.txt){
                        fs.outputFile(src,obj.txt,function(err) {
                            err ? reject(err) : resolve()
                        })
                    }
                }
            });
        }
    })
}