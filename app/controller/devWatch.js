/*
 * @Description: 开发时监听文件变化
 * @Author: yijian.song
 * @Version: 3.0.0
 * @Date: 2019-09-11 11:30:54
 * @LastEditors:
 * @LastEditTime: 2019-09-11 14:48:24
 */
"use strict"

const chokidar = require("chokidar")
const axios = require('axios')
const fs = require('fs-extra')

//开发时监听文件变化
module.exports = {
  fWatch: (req, res, next) => {
    const log = console.log.bind(console);
    const watcherItem = chokidar.watch('/Users/happyelements/github/webFE/mraids/item')
    watcherItem
      .on('ready', () => log('item-监听初始化加载完成'))
      .on('error', error => log(`item-监听error: ${error}`))
      .on('change', async (path)=> {
        const fr = await fs.readFile('/Users/happyelements/github/webFE/mraids/item/index.html', "utf-8");
        log(`\n 模版change：${path}`)
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post('http://10.130.151.193:9999/get_ios_html', { html: fr }).then(res=>{
          log(`ios : ${res.data} - ${ new Date()} ` )
        })
        axios.post('http://10.130.151.193:9999/get_an_html', { html: fr }).then(res=>{
          log(`安卓 : ${res.data} - ${ new Date()}`)
        })
      })



    // const watcherADconfig = chokidar.watch('/Users/happyelements/github/webFE/mraids/adconfig')
    // watcherADconfig
    //   .on('ready', () => log('config-监听初始化加载完成'))
    //   .on('error', error => log(`config-监听error: ${error}`))
    //   .on('change', async (path)=> {
    //     const iosfr = await fs.readJson('/Users/happyelements/github/webFE/mraids/adconfig/iosAdconfig.json', "utf-8");
    //     const anfr = await fs.readJson('/Users/happyelements/github/webFE/mraids/adconfig/anAdconfig.json', "utf-8");
    //
    //     log(`\n 配置change： ${path} `)
    //     axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    //     axios.post('http://10.130.151.193:9999/setdata?ad_type=1&os=1', iosfr).then(res=>{
    //       console.log(`ios ADconfig : ${res.data} - ${ new Date()}`)
    //     })
    //     axios.post('http://10.130.151.193:9999/setdata?ad_type=1&os=2', anfr).then(res=>{
    //       console.log(`安卓 ADconfig : ${res.data} - ${ new Date()}`)
    //     })
    //   })


  }

}
