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
  // 构建UI
  // fWatch: (req, res, next) => {
  //   const log = console.log.bind(console);
  //   const watcherItem = chokidar.watch('/Users/happyelements/gitlab/item/MRAID_item/ui')
  //   watcherItem
  //     .on('ready', () => log('item-监听初始化加载完成'))
  //     .on('error', error => log(`item-监听error: ${error}`))
  //     .on('change', async (path)=> {
  //       // const fr = await fs.readFile('/Users/happyelements/gitlab/item/MRAID_item/ui/cmtest.html', "utf-8");
  //       const fr = await fs.readFile('/Users/happyelements/gitlab/item/MRAID_item/ui/index.html', "utf-8");
  //       log(`发生change： ${path} `)
  //       axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  //
  //       axios.post('http://10.130.150.143:9999/get_ios_html', { html: fr }).then(res=>{
  //         console.log(`ios : ${res.data}`)
  //       })
  //
  //       axios.post('http://10.130.150.143:9999/get_an_html', { html: fr }).then(res=>{
  //         console.log(`安卓 : ${res.data}`)
  //       })
  //     })
  //
  //     const watcherADconfig = chokidar.watch('/Users/happyelements/gitlab/item/MRAID_item/adconfig')
  //     watcherADconfig
  //       .on('ready', () => log('config-监听初始化加载完成'))
  //       .on('error', error => log(`config-监听error: ${error}`))
  //       .on('change', async (path)=> {
  //         const iosfr = await fs.readJson('/Users/happyelements/gitlab/item/MRAID_item/adconfig/iosAdconfig.json', "utf-8");
  //         const anfr = await fs.readJson('/Users/happyelements/gitlab/item/MRAID_item/adconfig/anAdconfig.json', "utf-8");
  //         log(`发生change： ${path} `)
  //         axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  //         axios.post('http://10.130.150.143:9999/setdata?ad_type=1&os=1', iosfr).then(res=>{
  //           console.log(`ios ADconfig : ${res.data}`)
  //         })
  //         axios.post('http://10.130.150.143:9999/setdata?ad_type=1&os=2', anfr).then(res=>{
  //           console.log(`安卓 ADconfig : ${res.data}`)
  //         })
  //       })
  // },

  fWatch: (req, res, next) => {
    const log = console.log.bind(console);
    const watcherItem = chokidar.watch('/Users/happyelements/github/webFE/mraidMcTest')
    watcherItem
      .on('ready', () => log('item-监听初始化加载完成'))
      .on('error', error => log(`item-监听error: ${error}`))
      .on('change', async (path)=> {
        const fr = await fs.readFile('/Users/happyelements/github/webFE/mraidMcTest/index.html', "utf-8");
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        log(`\n change：${path}`)
        axios.post('http://10.130.150.143:9999/get_ios_html', { html: fr }).then(res=>{
          log(`ios : ${res.data}`)
        })

        axios.post('http://10.130.150.143:9999/get_an_html', { html: fr }).then(res=>{
          log(`安卓 : ${res.data}`)
        })
      })

      const watcherADconfig = chokidar.watch('/Users/happyelements/github/webFE/mraidMcTest/adconfig')
      watcherADconfig
        .on('ready', () => log('config-监听初始化加载完成'))
        .on('error', error => log(`config-监听error: ${error}`))
        .on('change', async (path)=> {
          const iosfr = await fs.readJson('/Users/happyelements/github/webFE/mraidMcTest/adconfig/iosAdconfig.json', "utf-8");
          const anfr = await fs.readJson('/Users/happyelements/github/webFE/mraidMcTest/adconfig/anAdconfig.json', "utf-8");
          log(`发生change： ${path} `)
          axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
          axios.post('http://10.130.150.143:9999/setdata?ad_type=1&os=1', iosfr).then(res=>{
            console.log(`ios ADconfig : ${res.data}`)
          })
          axios.post('http://10.130.150.143:9999/setdata?ad_type=1&os=2', anfr).then(res=>{
            console.log(`安卓 ADconfig : ${res.data}`)
          })
        })
  },

// /Users/happyelements/github/webFE


}
