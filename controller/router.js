"use strict"
const file = require("../models/file.js");
//const file = require("../models/file.js");


exports.buildershow = (req, res, next) => {
    res.render("builder", {
    	m1:["1","2","3"],
    	m2:["1","2","3"]
    });
}

exports.builder = (req, res, next) => {
	let alldata="";

	res.send("sds")

	/*req.addListener("data",function(chunk){
	    alldata += chunk;
	});

	//全部传输完毕
	req.addListener("end",function(){
	    console.log(alldata.toString());
	    res.end("success");
	});*/
	
   //res.send("dsfdfdf")
} 