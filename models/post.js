
function(){

	
	req.on("data", function(chunk) { alldata += chunk; });
	req.on("end", () => {
	    let ajaxData = queryString.parse(alldata);
	    console.log(ajaxData);

	    if (ajaxData.changkupath && ajaxData.changkuid && ajaxData.filepath && ajaxData.mbid) {
	        res.send({
	            "state": -1,
	            "info": '参数错误'
	        });
	        return;
	    };

	    //项目检查
	    fs.access(`${ajaxData.changkupath}`, fs.constants.R_OK | fs.constants.W_OK, err => {
	        if (err) {
	            endData = {
	                "state": -1,
	                "info": `请检查${ajaxData.changkupath}仓库是否存在 || set配置是否正确？`
	            };
	            res.send(endData)
	            return;
	        }
	        let goujianfile = slash(`${ajaxData.changkupath}/${ajaxData.changkuid}`)

	        fs.readdir(goujianfile, (err, data) => {
	            if (err || !data || data.length === 0) {
	                console.log("开始构建---");
	                // mkdirFn(cpath, req, res)
	                builder.builder(req, res, next, ajaxData, cpath);
	                return false;
	            }
	            console.log("项目已存在构建取消 xx")
	            res.send({
	                "state": -1,
	                "info": `该项目已经存在 - ${goujianfile}`
	            })
	        })
	    })

	});

}



