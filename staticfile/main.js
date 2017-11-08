! function() {
    function Ajax(o) { this.data = { "url": "", "type": "POST", "dataType": "json", "data": "", "encode": false, "async": true, "success": function(e) {}, "err": function(e) {}, "initFn": function(_this) {} }; for (var i in o) { this.data[i] = o[i] } if (this.data.url === "") { return }
        this.fn = { "jsonof": function(obj) { var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; return isjson }, "setUrlK": function setUrlK(ojson, encode) { var s = "",
                    name, key; for (var p in ojson) { if (ojson.hasOwnProperty(p)) { name = p }
                    key = ojson[p]; var value = null; if (encode) { s += "&" + name + "=" + encodeURI(encodeURI((typeof key == "object" ? JSON.stringify(key) : key))) } else { s += "&" + name + "=" + encodeURI((typeof key == "object" ? JSON.stringify(key) : key)) } } return s.substring(1, s.length) } };
        this.go_data = ""; if (this.data.data && (this.fn.jsonof(this.data.data) || typeof this.data.data === "string")) { if (this.fn.jsonof(this.data.data)) { this.go_data = this.fn.setUrlK(this.data.data, this.data.encode) } else { this.go_data = this.data.data } } else { return }
        this.init() }
    Ajax.prototype.init = function() { this.data.initFn(this); var _this = this;
        this.oAjax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"); if (this.data.type.toUpperCase() === "GET") { if (this.go_data) { this.oAjax.open(this.data.type, this.data.url + "?" + this.go_data, this.data.async) } else { this.oAjax.open(this.data.type, this.data.url, this.data.async) } } if (this.data.type.toUpperCase() === "POST") { this.oAjax.open(this.data.type, this.data.url, this.data.async);
            this.oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8") }
        this.oAjax.send(this.data.type.toUpperCase() === "GET" ? null : this.go_data);
        this.oAjax.onreadystatechange = function() { _this.changefn() } };
    Ajax.prototype.changefn = function() { if (this.oAjax.readyState === 4) { this.statusCode = this.oAjax.status; if (this.statusCode === 200) { this.data.success(JSON.parse(this.oAjax.responseText)) } else { this.data.err(this.statusCode) } } };
    window.Ajax = Ajax }();
if (typeof(module) !== "undefined") { module.exports = window.Ajax } else { if (typeof define === "function" && define.amd) { define([], function() { return window.Ajax }) } };