/*
	BombBox 1.0.1  _轻量级弹窗组件
	作者：songyijian 
	发布：2016.2
		 2016.11.04

	API
		new BombBox(t,{
			'type':'',						//弹框类型 alert,	confirm , prompt , textarea
			'bombClass':'', 		  		//<div class="bomb-document 这里增加一个class" >
			'center':true,            		//中间位置 (mr)
			'bg':true,                		//是否有背景(mr)
			'closeHtml':false,        		//关闭按钮的内容
			'timeOut':0,			  		//定时关闭
			"textareaValue":"",				//textarea = value
			'promptValue':"",				//prompt=Value
			'initFn':function(_this){}, 	//初始化后fun
			'closeFn': function(_this){},  	//关闭回调
			'yesBtnFn':function(value){},	//点击确定按钮回调
			'append': document.body   		//放在什么位置
		})
		
		FN
			this.html('') 	//修改内容区域信息
			this.center()	//居中方法
			this.close()	//关闭
	
*/
!function(){function BombBox(t,key){this.t=t;this.key=key;this.dataJ={"type":"","bombClass":"","center":true,"bg":true,"closeHtml":false,"timeOut":0,"textareaValue":"","promptValue":"","initFn":function(_this){},"closeFn":function(_this){},"yesBtnFn":function(value){},"append":document.body};for(var i in key){this.dataJ[i]=key[i]}this.init(this.dataJ.type)}BombBox.prototype.init=function(type){this.bombDocument=document.createElement("div");this.bombClose=document.createElement("big");this.bombHtml=document.createElement("div");this.bombClose.className="bomb_closebtn";if(this.dataJ.closeHtml){this.bombClose.innerHTML=this.dataJ.closeHtml}this.bombHtml.className="bomb_html";this.bombHtml.innerHTML=this.t;if(!type){this.bombDocument.className="bomb_document"}else{if(type==="alert"||type==="confirm"||type==="prompt"||type==="textarea"){if(type==="alert"){this.bombDocument.className="alert_document";this.bombYesBtn=document.createElement("button");this.bombYesBtn.className="bomb_yes_btn";this.bombYesBtn.innerHTML="确定";this.bombDocument.appendChild(this.bombYesBtn)}else{if(type==="confirm"||type==="prompt"||type==="textarea"){if(type==="confirm"){this.bombDocument.className="confirm_document"}if(type==="prompt"||type==="textarea"){type==="prompt"?this.bombDocument.className="prompt_document":this.bombDocument.className="textarea_document"}this.bombYesBtn=document.createElement("button");this.bombYesBtn.className="bomb_yes_btn";this.bombYesBtn.innerHTML="确定";this.bombNoBtn=document.createElement("button");this.bombNoBtn.className="bomb_no_btn";this.bombNoBtn.innerHTML="取消";this.bombDocument.appendChild(this.bombYesBtn);this.bombDocument.appendChild(this.bombNoBtn);if(type==="prompt"){this.promptInput=document.createElement("input");this.promptInput.className="prompt_input";this.promptInput.type="text";this.promptInput.value=this.dataJ.promptValue;this.bombHtml.appendChild(this.promptInput)}if(type==="textarea"){this.promptInput=document.createElement("textarea");this.promptInput.className="textarea_input";this.promptInput.value=this.dataJ.textareaValue;this.bombHtml.appendChild(this.promptInput)}this.bombDocument.appendChild(this.bombNoBtn);this.bombDocument.appendChild(this.bombYesBtn)}}}}if(this.dataJ.bombClass){this.bombDocument.className+=" "+this.dataJ.bombClass}if(this.dataJ.bg){this.bombBg=document.createElement("div");this.bombBg.className="bomb_bg";this.dataJ.append.appendChild(this.bombBg)}this.bombDocument.appendChild(this.bombClose);this.bombDocument.appendChild(this.bombHtml);this.dataJ.append.appendChild(this.bombDocument);if(this.dataJ.center){this.center()}var _this=this;if(this.promptInput||this.bombYesBtn){this.promptInput?this.promptInput.focus():this.bombYesBtn.focus()}if(type==="alert"||type==="confirm"||type==="prompt"||type==="textarea"){this.bombDocument.onkeyup=function(e){var keyCode=(window.event)?e.which:e.keyCode;if(keyCode===13){_this.yesFn(this,type);console.log(25222)}else{if(keyCode===27){_this.close()}}}}if(this.bombClose){this.bombClose.onclick=function(){_this.close()}}if(this.bombNoBtn){this.bombNoBtn.onclick=function(){_this.close()}}if(this.bombYesBtn){this.bombYesBtn.onclick=function(){_this.yesFn(this,type)}}if(_this.dataJ.timeOut){setTimeout(function(){_this.close()},_this.dataJ.timeOut)}this.dataJ.initFn(this)};BombBox.prototype.html=function(t){this.bombHtml.innerHTML=t};BombBox.prototype.yesFn=function(This,type){var _value=true;this.close();if(type==="prompt"||type==="textarea"){this.promptInput.value?_value=this.promptInput.value:_value=true}else{if(type==="confirm"){_value=true}}this.dataJ.yesBtnFn(_value)};BombBox.prototype.center=function(fn){if(this.bombDocument.currentStyle){this.bombDocument.width=this.bombDocument.currentStyle["width"];this.bombDocument.height=this.bombDocument.currentStyle["height"]}else{this.bombDocument.width=getComputedStyle(this.bombDocument,false)["width"];this.bombDocument.height=getComputedStyle(this.bombDocument,false)["height"]}this.bombDocument.style.cssText="top:50%;left:50%;margin-left:"+parseInt(this.bombDocument.width)/-2+"px;margin-top:"+parseInt(this.bombDocument.height)/-2+"px";if(fn){fn()}};BombBox.prototype.close=function(){this.dataJ.append.removeChild(this.bombDocument);if(this.dataJ.bg==true){this.dataJ.append.removeChild(this.bombBg)}if(this.dataJ.closeFn){this.dataJ.closeFn(this)}};window.BombBox=BombBox}();if(typeof(module)!=="undefined"){module.exports=window.BombBox}else{if(typeof define==="function"&&define.amd){define([],function(){return window.BombBox})}};