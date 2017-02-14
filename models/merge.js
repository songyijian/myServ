//js
const fs = require("fs");
const path = require("path");
exports.mergeJS = (jsPath, minPath, list, path) => {
    let content = '';
    fs.stat(jsPath, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            fs.watchFile(jsPath, (olds, news) => {
                console.log(jsPath)
                if (olds.mtime === news.mtime) { return }
                list.forEach((item, index) => {
                    content += fs.readFileSync(`${path}/${item}`)
                })
                console.log(content)
                fs.writeFile(minPath, content, (err) => {
                    if (err)
                        console.log(err)
                    content = '';
                })
            })
        }
    })
}



exports.mergeCSS = (cssPath, minPath, list, path) => {
    let content = '';
    fs.stat(cssPath, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            fs.watchFile(cssPath, (olds, news) => {
                console.log(cssPath)
                if (olds.mtime === news.mtime) { return }
                list.forEach((item, index) => {
                    content += fs.readFileSync(`${path}/${item}`)
                })
                console.log(content)
                fs.writeFile(minPath, content, (err) => {
                    if (err)
                        console.log(err)
                    content = '';
                })
            })
        }
    })
}