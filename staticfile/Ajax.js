/*
	ajax 1.0.1 简易原生ajax封装
	作者：songyijian 
	发布：2016.10.20
	
	API
		new Ajax({
			"url":"",			// * string  请求地址 
			"type":"",			//string 请求类型只支持POST GET  ,默认 POST 
			//"dataType":"json", //尚未完成该功能（ 接受数据类型 ）
			"data":"",			//* string || json 请求数据
			"encode":false,		//多次编码（处理  react 乱码）
			"async":true,		//异步
			"initFn":function(_this){},//初始化回调（_this === this 可以拿到对象所有的信息）
			"success":function(e){},//成功回调（e 为接收到的数据） 处理业务就在这里
			"err":function(e){}	// 错误回调 （e 回调的错误码 404 ...）
		})
		
		ATTR 
			.go_data	// 处理json参数 为字符串，这是传给后台的最终参数形态


*/

! function() {
    function Ajax(o) {
        this.data = {
            "url": "",
            "type": "POST",
            "dataType": "json",
            "data": "",
            "encode": false,
            "async": true,
            "initFn": function(_this) {},
            "success": function(e) {},
            "err": function(e) {}
        };
        for (var i in o) { this.data[i] = o[i] };
        if (this.data.url === "") return;

        this.fn = {
            "jsonof": function(obj) {
                var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
                return isjson;
            },
            "setUrlK": function setUrlK(ojson, encode) {
                var s = '',
                    name, key;
                for (var p in ojson) {
                    if (ojson.hasOwnProperty(p)) { name = p };
                    key = ojson[p];
                    var value = null;
                    if (encode) {
                        s += "&" + name + "=" + encodeURI(typeof key == "object" ? JSON.stringify(key) : key);
                    } else {
                        s += "&" + name + "=" + encodeURI(typeof key == "object" ? JSON.stringify(key) : key);
                    }
                };
                return s.substring(1, s.length);
            }
        };

        this.go_data = "";
        if (this.data.data && (this.fn.jsonof(this.data.data) || typeof this.data.data === 'string')) {
            if (this.fn.jsonof(this.data.data)) {
                this.go_data = this.fn.setUrlK(this.data.data, this.data.encode);
            } else {
                this.go_data = this.data.data;
            };
        } else { return; };

        this.init();

    };
    Ajax.prototype.init = function() {
        this.data.initFn(this);
        var _this = this;

        //1 
        this.oAjax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        //2
        if (this.data.type.toUpperCase() === "GET") {
            if (this.go_data) {
                this.oAjax.open(this.data.type, this.data.url + "?" + this.go_data, this.data.async);
            } else {
                this.oAjax.open(this.data.type, this.data.url, this.data.async);
            }
        }
        if (this.data.type.toUpperCase() === "POST") {
            this.oAjax.open(this.data.type, this.data.url, this.data.async);
            this.oAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
        }

        //3
        this.oAjax.send(this.data.type.toUpperCase() === "GET" ? null : this.go_data);

        //4
        this.oAjax.onreadystatechange = function() { _this.changefn() };
    };
    Ajax.prototype.changefn = function() {
        //
        if (this.oAjax.readyState === 4) {
            this.statusCode = this.oAjax.status
            if (this.statusCode === 200) {
                this.data.success(JSON.parse(this.oAjax.responseText));
            } else {
                this.data.err(this.statusCode);
            };
        };
    };

    window.Ajax = Ajax;

}();
if (typeof(module) !== 'undefined') {
    exports = window.Ajax;
} else if (typeof define === 'function' && define.amd) {
    define([], function() {
        'use strict';
        return window.Ajax;
    });
};