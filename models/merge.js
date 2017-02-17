const fs = require("fs");
const path = require("path");

exports.mergeFile = (ajaxData, fn) => {
    let pPath = ajaxData.path;
    let pV = JSON.parse(ajaxData.v);
    console.log(typeof pV);


    if (!pPath || !pV || !pV.js || !pV.js.list || !pV.js.min || !pV.css || !pV.css.list || !pV.css.min) {
        fn({ "state": -1, "info": "_.json配置有问题，或没有找到指定盘符下的文件" })
        return;
    }

    pV.js.list.forEach((item, index) => {
        watchFn(item, pV.js.min, pV.js.list)
    })
    pV.css.list.forEach((item, index) => {
        watchFn(item, pV.css.min, pV.css.list)
    })

    function watchFn(item, min, list) {
        let nPath = path.join(`${pPath}`, `${item}`)
        console.log(nPath);
        fs.stat(nPath, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                fs.watchFile(nPath, { persistent: true, interval: 500 }, (curr, prev) => {
                    // console.log(`${nPath}: ${curr.mtime}`, `${nPath}: ${prev.mtime}`);
                    if (curr.mtime === prev.mtime) { return }
                    let content = "";
                    list.forEach((itemc, index) => {
                        let cPath = path.join(`${pPath}`, `${itemc}`)
                        content += `\n/**下面是${itemc}的内容 */\n` + fs.readFileSync(`${cPath}`, 'utf8');
                    });
                    fs.writeFile(path.join(`${pPath}`, `${min}`), content, 'utf8', (err) => {
                        content = '';
                    })
                })
            }
        })
    }
}