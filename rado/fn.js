/*
	fn 1.0.0  js常规方法整理 ，
	作者：songyijian 
	发布：2016.10.20
	
*/

!function(){

	function getDOM(selector,context){
		var arr=[],els;
		if(selector && typeof selector === 'string'){
			if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
	            els = [document.getElementById(selector.split('#')[1])]
	        }else {
	            els = (context || document).querySelectorAll(selector)
	        }
	        for (var i = 0; i < els.length; i++) {
	            if (els[i].nodeName) arr.push(els[i])
	        }
			return arr;
		}else if (selector.nodeType || selector === window || selector === document) {
            arr.push(selector);
       }else if (selector.length > 0 && selector[0].nodeType) {
            for (i = 0; i < selector.length; i++) {
                arr.push(selector[i])
            }
        }
	};
	
	//getClass 兼容老版本
	function getClass(classN,dom){
	    var fDom = dom && dom.nodeType ? dom : document;
	    if(classN && typeof classN === "string"){
	        if( document.getElementsByClassName ){
	            return document.getElementsByClassName(classN);
	        }else{
	            var tags = fDom.getElementsByTagName("*");
	            var tagArr=[];
	            if(tags.length>0){
	                for(var i=0;i<tags.length; i++){
	                    if(tags[i].className && tags[i].className.match( new RegExp( "(\\s|^)" + classN + "(\\s|$)"))) {
	                        tagArr.push( tags[i] );
	                    }
	                }
	                return tagArr;
	            }
	        }
	    }else{ return null; };
	}
	
	//is
	function is(el,selector) {
        if (!el.nodeType) return false;
        var compareWith, i;
        if (typeof selector === 'string') {
            var el = this;
            if (el === document) return selector === document;
            if (el === window) return selector === window;
            
            if (typeof el.matches !== 'undefined') return el.matches(selector);
            else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
            else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
            else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
            else {
                compareWith = (el || document).querySelectorAll(selector);
                for (i = 0; i < compareWith.length; i++) {
                    if (compareWith[i] === el) return true;
                }
                return false;
            }
        }
        else if (selector === document) return el === document;
        else if (selector === window) return el === window;
        else {
            if (selector.nodeType || selector instanceof Dom7) {
                compareWith = selector.nodeType ? [selector] : selector;
                for (i = 0; i < compareWith.length; i++) {
                    if (compareWith[i] === el) return true;
                }
                return false;
            }
            return false;
        }
    };

	//Events
	//绑定事件(自定义事件)
	function on(obj,events,targetSelector,listener,capture){
		var _this=null;
		//委托处理
		function handleLiveEvent(e) { 
            var otarget = e.target;
            console.log(otarget.matches(targetSelector))
            if (is(otarget,targetSelector)) listener.call(otarget,e);
            else {
                var parents = otarget.parentNode;
                for (var k = 0; k < parents.length; k++) {
                    if (is( parents[k],targetSelector )) listener.call(parents[k], e);
                }
            }
        }
		if(!obj) return false;
		else{
			if(obj.length)_this=obj;
			else{
				if(obj.nodeType) _this=[obj];
			}
		}
		if(!events || typeof events !== 'string'){
			return false;
		};
		var i, j;
		var eventName = events.split(' ');
		if(_this){
			for (i = 0; i < _this.length; i++) {
				console.log(1)
				if(_this[i].nodeType){
					_this[i].index=i;
		            if (typeof targetSelector === 'function' || targetSelector === false) {
		                // Usual eventName
		                if (typeof targetSelector === 'function') {
		                    listener = arguments[2];
		                    capture = arguments[3] || false;
		                }
		                for (j = 0; j < eventName.length; j++) {
		                    _this[i].addEventListener(eventName[j], listener, capture);
		                }
		            }else {
		                //Live eventName
		                for (j = 0; j < eventName.length; j++) {
		                    if (!_this[i].liveListeners) _this[i].liveListeners = [];
		                    _this[i].liveListeners.push({listener: listener, liveListener: handleLiveEvent});
		                    _this[i].addEventListener(eventName[j], handleLiveEvent, capture);
		                }
		            }
				}
	        }
		};
		/*obj.listeners = obj.listeners||{};
		obj.listeners[events] = obj.listeners[events] ||[];
		obj.listeners[events].push( listener );
		if(obj.nodeType){
		    if(obj.addEventListener){
		      obj.addEventListener(events,listener,false);
		    }else{//this指向对象默认指向window
				obj.attachEvent('on'+events,function(){ listener.call(obj,arguments) });
		    } 
		}; */
	};
	//调用自定义事件 
	function trigger(obj,events){ 
	 	if(obj.listeners && obj.listeners[events]){
	  		for(var i=0;i<obj.listeners[events].length;i++){
	    		obj.listeners[events][i]();
	  		}
	 	}
	}
	function off(){}

   /* function matchesSelector(element,selector){
	    if(element.matches){
	        return element.matches(selector);
	    } else if(element.matchesSelector){
	        return element.matchesSelector(selector);
	    } else if(element.webkitMatchesSelector){
	        return element.webkitMatchesSelector(selector);
	    } else if(element.msMatchesSelector){
	        return element.msMatchesSelector(selector);
	    } else if(element.mozMatchesSelector){
	        return element.mozMatchesSelector(selector);
	    } else if(element.oMatchesSelector){
	        return element.oMatchesSelector(selector);
	    } else if(element.querySelectorAll){
	        var matches = (element.document || element.ownerDocument).querySelectorAll(selector),
	            i = 0;
	 
	        while(matches[i] && matches[i] !== element) i++;
	        return matches[i] ? true: false;
	    }
	    throw new Error('Your browser version is too old,please upgrade your browser');
	}*/
	


	//Attr
	function attr(obj,attrs, value) {
		if(obj && obj.nodeName){
            if (arguments.length === 2 && typeof attrs === 'string') {
                if (obj) return obj.getAttribute(attrs);
                else return undefined;
            }else {
                // Set attrs
                if (arguments.length === 3) {
                    // String
                    obj.setAttribute(attrs, value);
                }else {
                    // Object
                    for (var attrName in attrs) {
                        obj[attrName] = attrs[attrName];
                        obj.setAttribute(attrName, attrs[attrName]);
                    }
                }
                return obj;
            }
		}
    };
    function rmAttr(obj,attr) {
    	if(obj.nodeName)
        	obj.removeAttribute(attr);
        return this;
    }
    
	/* DOM style */
	/* set  classList  */
	function hasClass( elements,cName ){
		if(elements.classList) return elements.classList.contains(cName);
		else return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
	}
	function addClass( elements,cName ){
		if(elements.classList.length){
			elements.classList.add(cName)
		}else{
		    if(!hasClass( elements,cName )) elements.className += " " + cName;
		}
	}
	function rmClass( elements,cName ){  
	    if( hasClass( elements,cName ) ){  
	        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
	    }
	}
	

	/* get style*/
	function getStyle(obj,attr){ 
	    if(obj.currentStyle){
	        return obj.currentStyle[attr];
	    }else{
	        return getComputedStyle(obj,false)[attr];
	    }
	};


	/* FN  url ========================= */
	/* get url velue */
	function getUrlK(key, obj) {
	    var oobj = obj || window.location.search;
	    var arr1 = [];
	    if(oobj){
		    if(/\?/.test(oobj)){
	        	arr1 = oobj.toString().split('?');
		    }else{
	        	arr1.push(oobj)
		    };
		    for(var i = 1; i < arr1.length; i++) {
		        if(/&/.test(arr1[i])) {
		            var arr2 = arr1[i].split('&');
		            for(var j = 0; j < arr2.length; j++) {
		                if(arr2[j]) {
		                    var arr3 = arr2[j].split('=');
		                    if(arr3[0] == key) {
		                        return decodeURI(arr3[1]);
		                    }
		                };
		            };
		        } else {
		            var arr2 = arr1[i].split('=');
		            if(arr2[0] == key) {
		                return decodeURI(arr2[1]);
		            };
		        };
		    };
	    };
	};

	/*Json Turn to url type */
	function setUrlK(ojson) {
	    var s='',name, key;
	    for(var p in ojson) {
	        if(ojson.hasOwnProperty(p)) { name = p };
	        key = ojson[p];
	        var value=null;
	        s += "&" + name + "=" + encodeURI( typeof key=="object" ? JSON.stringify( key ) : key);
	    };
	    return s.substring(1,s.length);
	};


	/* of type  ========================= */
	function typeOf(obj){
		if(typeof obj ==='object' || typeof obj ==='function'){
			if(typeof(obj) === "object"){
				if(typeof(obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length){
					return "Json";
				}
				if(obj && typeof obj==='object' && typeof obj.length==='number' && typeof obj.splice==='function' && !(obj.propertyIsEnumerable('length'))){
					return "Array";
				}
				if(typeof(obj) === "object" && obj !== undefined){
					return "Null";
				}
				if(typeof(obj) === "object" && obj.toString()==="[object HTMLDivElement]" && obj.nodeName){
					//return obj.nodeName;
					return "Node";
				}
				if(typeof(obj) === "object" && obj.toString()==="[object NodeList]"){
					return "NodeList";
				}
				if(typeof(obj) === "object" && obj.toString()==="[object Window]"){
					return "Window";
				}
			};
			
			if(typeof obj ==='function'){
				return "Function";
			}
		}else{
			return typeof obj;
		}
	}

	//滚动到指定位置  goTo(‘id’)
	function goTo(o){
		if(document.getElementById(o)){
			var obj=document.getElementById(o);
			if(typeof startMove !== 'undefined'){
				startMove(document.body||document.documentElement,{"scrollTop":obj.offsetTop},500);
			}else{
				obj.scrollIntoView({block: "start", behavior: "smooth"})
			}
		}
	};
	
	
	var mobile ={
		type:(function(){
			//移动设备类型
			var ua = navigator.userAgent.toLowerCase();	
			if (/iphone|ipad|ipod/.test(ua)) {
				return 'ios';
			} else if (/android/.test(ua)) {
				return 'android';
			}else{
				return 'false';
			}
		})(),
		orient:(function(){
			//判断横竖屏切换
		    if (window.orientation == 0 || window.orientation == 180) {
		        return true;
		    }else if (window.orientation == 90 || window.orientation == -90) {
		       return false;
		    };
		})()
	};


	window.fn = {
		//dom
		'getDOM':getDOM,
		'getClass':getClass,
		
		//attr
		'hasClass':hasClass,
		'addClass':addClass,
		'rmClass':rmClass,
		
		//style
		'getStyle':getStyle,
		'attr':attr,
		'rmAttr':rmAttr,
		
		//数据类型
		'typeOf':typeOf,
		
		//Events
		'on':on,
		'off':off,
		'trigger':trigger,
		
		//Fn
		'getUrlK':getUrlK,
		'setUrlK':setUrlK,
		'goTo':goTo,
		
		//mobile
		'mobile':mobile
	};


}();
if (typeof(module) !== 'undefined'){
    module.exports = window.fn;
}else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.fn;
    });
};