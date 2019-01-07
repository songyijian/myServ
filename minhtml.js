const minify = require('html-minifier').minify;
const fs = require('fs-extra')
const UglifyJS = require("uglify-js");


// fs.read()
// fs.write()

var patht = '/Users/happyelements/git/endcards/lineTem/temp_4/index.html'
// fs.readFile(patht, 'utf8', (err, data) => {
//   if (err) return console.error(err)
//   console.log(data,'-----------------------------') // => hello!
//
//   console.log(
//     minify(data, {
//       removeAttributeQuotes: true,
//       collapseInlineTagWhitespace:true,
//       minifyJS:true
//     })
//   )
// })



// var doms='<a>xxxxx</a>'
// var doms='<a class="s">xxxxx</a>'
// doms.match(/<a(.+|.?)>(.+)<\/a>/g)

var codes =`// endcard展示设定函数，最好别动
  (function(doc,win){
     var docEl = doc.documentElement,
         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
         recalc = function(){  docEl.style.fontSize = 100 * (docEl.clientWidth/750) + 'px' }
         recalc();
     navigator.userAgent.match(/iphone|ipad|ipod/i)  && docEl.setAttribute("data-iosx" , win.devicePixelRatio);
     docEl.setAttribute('data-clientWidth',docEl.clientWidth);
     docEl.setAttribute('data-clientHeight',docEl.clientHeight);
     if (!doc.addEventListener) return;
     win.addEventListener(resizeEvt, recalc, false);
     doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document,window)

  !function () {
    var mainbox = document.getElementById('mainbox');
    var orient = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(orient, adaptationMeta, false);
    adaptationMeta();
    function adaptationMeta() {
        if (window.orientation == 180 || window.orientation == 0) {
            mainbox.className = 'vertical'
        }
        if (window.orientation == 90 || window.orientation == -90) {
            mainbox.className = 'transverse'
        }
    }
  }()



  // 点击函数
  function ocBridge(type, sif) {
    window.event? window.event.cancelBubble = true : e.stopPropagation();
    if(!!sif){
      window.location.href = 'sigmobAd://' + type;
    }
  }


    // 预览逻辑别动，不真实参与上线的endcard
    // 通过url参数来初始化样式
    /* transverse横  vertical竖*/
    var urldata = strToJson();
    if(urldata.showtype==='transverse'){ mainbox.className = 'transverse' }
    if(urldata.showtype==='vertical'){ mainbox.className = 'vertical' }
    //模版处理
    window.templateStr = document.querySelector('#mainbox').innerHTML;
    window.sonMethod = function sonMethod(data,str) {
      if(str){mainbox.className = str }
      document.querySelector('#mainbox').innerHTML = templateFill( window.templateStr, data )
      eval(document.getElementById('tmp').innerHTML)
    }

    //依赖
    /*
      变量模版替换函数 {var}
      return dom str，
      注意：避免src报错，可以使用 :src 来处理
    */
    function templateFill(str,data) {
      var newStr = str;
      if(typeof str !== "string"){  return console.error('str must be a string.') }
      var strDataKeyList = str.match(/\{\{[a-zA-Z\.\_]+\}\}/g);  //匹配规则
      strDataKeyList.forEach(item=>{
        var keylist = item.substr(2,item.length-4).split('.')
        newStr = newStr.replace(new RegExp(item,"g"), getObj(data.dataList,keylist))
      })
      newStr = newStr.replace(/:src/g, 'src')   //处理静态文件初始化报错
      newStr = newStr.replace(/text\/tmplate/g, 'text/javascript')

      return newStr;
      /* 对象多层取值方法 */
      function getObj(data,keylist){
        var oj = data;
        keylist.forEach(k=>{ oj = oj[k] })
        return typeof oj==="object" ? JSON.stringify(oj) : oj
      }
    }

    /**
     * desc  strToJson() 序列化字符串转json
     */
    function strToJson(url) {
      var  urls = url ? url : window.location.search;
      if(!urls){return {}}
      var search = urls.substr(urls.indexOf('?')>=0 ? urls.indexOf('?')+1 : 0)
      if (!search && urls.indexOf('=')<0) { return {} }
      try {
        let nJson = {}
        decodeURIComponent(search).split('&').forEach(item=>{
          let o = item.split('=')
          nJson[o[0]] = o[1]
        })
        return nJson
      } catch (e) {
        return new Error('strToJson 序列化字符串不能被正确解析成json')
      }
    }`
    // console.log(UglifyJS.minify(codes))
// console.log(codes.match(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g))
// console.log(codes.match(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g))


// fs.readFile(patht, 'utf8', function (err, data) {
//     if (err) { throw err }
//     // fs.writeFile('./test_result.html', );
//     var strdom = minify(data,{
//       removeComments: true,
//       collapseWhitespace: true,
//       customEventAttributes:true,
//       minifyJS: function (str){
//         // var cstr = UglifyJS.minify(str).code
//         // var cstr = UglifyJS.minify(str, { mangle: { reserved: ['firstLongName'] } }).code;
//         // var cstr = UglifyJS.parse(str, { fromString: true })
//         // var cc = str
//         // cc.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g,'')
//         // cc.replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g,'')
//         console.log(str.replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, ''))
//         return 'cc'
//       },
//       minifyCSS:true,
//     })

//     // console.log( strdom )
// });
