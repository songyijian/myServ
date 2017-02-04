"use strict"
const file = require("../models/file.js");
const queryString  = require("querystring");


exports.buildershow = (req, res, next) => {
    res.render("builder", {
    	m1:["1","2","3"],
    	m2:["1","2","3"]
    });
}

exports.builder = (req, res, next) => {
	let alldata="";

	req.addListener("data",function(chunk){
	    alldata += chunk;
	});

	//全部传输完毕
	req.addListener("end",function(){
		let ajaxData = queryString.parse(alldata);
		
		
	
	    res.send({
			a:"df",
			b:123
		})
	    
	    
	    console.log(ajaxData);
	});
	
	
} 

