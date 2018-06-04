var mysql = require('mysql');
var $conf = require('../db/db');
var $sql = require('./menuSql.js');
//var $util = require('../util/util');
//var $sql = require('./wxbugSqlMapping');
// var uuid = require('node-uuid');

//const crypto = require("crypto");

// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
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

module.exports = {
    /**
     * 查询菜单栏
     */
    queryMenu:function(req,res,next){
        pool.getConnection(function(err,connection){
            if(err){
                console.log("数据库连接错误"+err);
            };
            connection.query($sql.queryMenu,function(err,result){
                if(err){
                    console.log("数据库查询错误"+err);
                    jsonWrite(res,{'code':504,'msg':'查询数据库出问题了'});
                }else{
                    jsonWrite(res,{'code':0,'data':result,'msg':'查询成功'});
                };
                connection.release()
            })
        })
    },
    /**
     * 删除菜单栏
     */
    deleteMenu:function(req,res,next){
        pool.getConnection(function(err,connection){
            if(err){
                console.log("数据库连接错误"+err);
                jsonWrite(res,{'code':504,'msg':'数据库连接出错'})
            };
            var parma = req.body;
            connection.query($sql.deleteMenu,[parma.id],function(err,result){
                if (err) {
                    console.log("数据库查询错误"+err);
                    jsonWrite(res,{'code':504,'msg':'查询数据库出问题了,请检查参数是否传正确'})
                } else {
                    jsonWrite(res,{'code':0,'msg':'删除成功'});
                };
                connection.release();
            })
        })
    },
    /**
     * 修改菜单栏
     */
    updateMenu:function(req,res,next){
        pool.getConnection(function(err,connection){
            if(err){
                console.log("数据库连接错误"+err);
                jsonWrite(res,{'code':504,'msg':'数据连接错误'});
            };
            var parma = req.body;
            connection.query($sql.updateMenu,[parma.name,parma.url,parma.order,parma.id],function(err,result){
                if (err) {
                    console.log(err);
                    jsonWrite(res,{'code':504,'msg':'查询数据库出问题了,请检查参数是否传正确'})
                } else {
                    jsonWrite(res,{'code':0,'msg':'修改成功'});
                    connection.release();
                }
            })
        })
    },
    /**
     * 新增菜单栏
     */
    saveMenu:function(req,res,next){
        pool.getConnection(function(err,connection){
            if(err){
                console.log("数据库连接错误"+err);
                jsonWrite(res,{'code':504,'msg':'数据连接错误'});
            };
            var parma = req.body;
            connection.query($sql.saveMenu,[parma.name,parma.url,parma.order],function(err,result){
                if (err) {
                    console.log(err);
                    jsonWrite(res,{'code':504,'msg':'查询数据库出问题了,请检查参数是否传正确'})
                } else {
                    jsonWrite(res,{'code':0,'msg':'新增成功'});
                    connection.release();
                }
            })
        })
    }
}