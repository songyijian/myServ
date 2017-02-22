const fs = require("fs");
const path = require("path");
const uglifyjs = require("uglify-js");


exports.mergeFile = (ajaxData, fn) => {
    let pPath = ajaxData.path;
    let pV = JSON.parse(ajaxData.v);


    if (!pPath || !pV || !pV.js || !pV.js.list || !pV.js.min || !pV.css || !pV.css.list || !pV.css.min) {
        fn({ "state": -1, "info": "_.json配置有问题，或没有找到指定盘符下的文件" })
        return;
    }
    //console.log(pV.js.list.toString());
    let jsList = pV.js.list.map(function(item, index) {
        return path.join(`${pPath}`, `${item}`)
    })
    let cssList = pV.css.list.map(function(item, index) {
        return path.join(`${pPath}`, `${item}`)
    })

    pV.js.list.forEach((item, index) => {
        watchFn(item, pV.js.min, pV.js.list, jsList)
    })
    pV.css.list.forEach((item, index) => {
        watchFn(item, pV.css.min, pV.css.list, cssList)
    })

    function watchFn(item, min, list, fList) {
        let nPath = path.join(`${pPath}`, `${item}`)
        let ext = path.parse(nPath).ext;
        fs.stat(nPath, (err, data) => {
            let fdata = data;
            if (err) {
                console.log(err)
            } else {
                fs.watchFile(nPath, { persistent: true, interval: 500 }, (curr, prev) => {
                    if (curr.mtime === prev.mtime) { return }
                    console.log(curr)
                    let content = '';
                    let oon = true;
                    let fn = {
                        js() {
                            return uglifyjs.minify(fList).code;
                        },
                        css() {
                            let content = '';
                            list.forEach((itemc, index) => {
                                let cPath = path.join(`${pPath}`, `${itemc}`)
                                content += `\n/**下面是${itemc}的内容 */\n` + fs.readFileSync(`${cPath}`, 'utf8');
                            });
                            return content;
                        }
                    }
                    content = fn[ext.split('.')[1]]();
                    // if (ext === '.js') {
                    //     content = uglifyjs.minify(fList).code;
                    // } else
                    // if (ext === '.css') {
                    //     list.forEach((itemc, index) => {
                    //         let cPath = path.join(`${pPath}`, `${itemc}`)
                    //         content += `\n/**下面是${itemc}的内容 */\n` + fs.readFileSync(`${cPath}`, 'utf8');
                    //     });
                    // }

                    if (oon) {
                        fs.writeFile(path.join(`${pPath}`, `${min}`), content, 'utf8', (err) => {
                            console.log(path.join(`${pPath}`, `${min}`))
                            content = '';
                            oon = false;
                        })
                    }




                    // fs.writeFileSync(path.join(`${pPath}`, `${min}`), content, 'utf8')
                    // content = '';
                })
            }
        })
    }

}