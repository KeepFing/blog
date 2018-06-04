var fs = require('fs');
var jsonWrite = function(res, ret) {
	//   console.log(ret);
	if(typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: '操作失败'
		});
	} else {
		var code = {
			code: 200
		};
		res.json(ret);
	}
};

var getDate = function(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    if (date.getMinutes()<10) {
        var minute = '0'+date.getMinutes();
    } else {
        var minute = date.getMinutes();
    };
    if (date.getSeconds()<10) {
        var second = '0'+date.getSeconds();
    } else {
        var second = date.getSeconds();
    };
    return year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second
}

module.exports = {
    /**
     * 封装数据库连接错误时向err.log.txt写入日志
     * 首先判断是数据库连接时的错误还是查询时的错误，通过传入的type字段来判断
     */
    writeErrorLog:function(type,error){
        var time = getDate();
        if (type == 'link') {
            var errorType = '数据库连接错误';
        } else if (type == 'query') {
            var errorType = '数据库查询错误';
        } else {
            var errorType = '未知错误';
        };
        fs.appendFile('log/err.log.txt',time+'发生错误：'+errorType+error+'\r\n','utf8',function(err){
            if(err){
                console.log(err);
            }else{
                console.log('log写入成功');
            }
        });
    },
    /**
     * 封装数据库连接错误时的操作
     * 1.在控制台打印错误信息
     * 2.向请求体发送json数据
     */
    linkMysqlError:function(res,err){
        console.log("数据库连接错误"+err);
        jsonWrite(res,{'code':504,'msg':'数据库连接错误'});
    },
    /**
     * 封装数据库查询错误时的操作
     * 1.在控制台打印错误信息
     * 2.向前端发送json数据
     */
    queryMysqlError:function(res,err){
        console.log("数据库查询错误"+err);
        jsonWrite(res,{'code':0,'msg':'数据库查询错误'});
    },
    /**
     * 封装查询成功时向前端返回的json数据
     */
    querySuccess:function(res,result){
        jsonWrite(res,{'code':0,'data':result,'msg':'查询成功'});
    },
    /**
     * 封装删除成功时向前端返回的json数据
     */
    deleteSuccess:function(res){
        jsonWrite(res,{'code':0,'msg':'删除成功'});
    },
    /**
     * 封装修改成功时向前端返回的json数据
     */
    updateSuccess:function(res){
        jsonWrite(res,{'code':0,'msg':'修改成功'});
    },
    /**
     * 封装新增成功时向前端返回的json数据 
     */
    saveSuccess:function(res){
        jsonWrite(res,{'code':0,'msg':'新增成功'});
    },
    /**
     * 封装分页的函数，将需要的limit的参数返回出来
     */
    returnPages:function(page,limit){
        let left = (page*limit)-(limit*1);
        let right = (1*limit);
        let pageInfo = {'left':left,'right':right};
        return pageInfo;
    }
}