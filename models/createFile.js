const path = require("path")
const fs = require('fs-extra')
const slash = require('slash')

exports.creactFn = (fUrl,templateObj)=>{
    return templateObj.objs.map(item => {
        new Promise((resolve, reject)=>{
            let _df = typeof (item) == 'string' ? slash(fUrl + '/' + item) : slash(fUrl + '/' + item.name)
            let hz = path.extname( _df ).length
            console.log('创建...',_df)
            if (hz.length < 2) {
                //创建路径
                fs.ensureDir(_df, function(err) {
                    err ? reject(err) : resolve()
                });
            }else{
                //创建文件
                fs.ensureFile(_df, function(err) {
                    if(err){
                        reject(err)
                    }else{
                        if (item.template){
                            fs.outputFile(_df,item.template,function(err) {
                                err ? reject(err) : resolve()
                            })
                        }
                    }
                });
            }
        })
    })  
}