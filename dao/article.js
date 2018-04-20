var mysql = require('mysql');
var $conf = require('../db/db');
var $sql = require('./articleSql.js');
//var $util = require('../util/util');
//var $sql = require('./wxbugSqlMapping');
var uuid = require('node-uuid');

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
	queryBlog: function(req,res,next){
		pool.getConnection(function(err,connection){
			if (err) {
				console.log(err)
			}
			var parma = req.body
			connection.query($sql.queryBlog,function(err,result){
				console.log(result)
				var obj = {"code":0,'data':result,"msg":"成功"}
				jsonWrite(res,obj)
				connection.release();
			})
		})
	},
	
	saveBlog: function(req,res,next){
		pool.getConnection(function(err,connection){
			if (err) {
				console.log(err)
			}
			var parma = req.body
			var id = uuid.v4().replace(/-/g,'');
			connection.query($sql.saveBlog,[id,parma.title,parma.subTitle,parma.author,parma.content,parma.typeId,parma.createTime],function(err,result){
				if(err){
					jsonWrite(res,{'code':504,'msg':'有毒'})
				}
				jsonWrite(res,{'code':0,'msg':'成功'})
				connection.release();
			})
		})
	},
	
	addWatchTimes: function(req,res,next){
		pool.getConnection(function(err,connection){
			if(err){
				console.log(err)
			}
			var parma = req.body
			connection.query($sql.updateBlogWatchTimes,[parma.times,parma.id],function(err,result){
				if (err) {
					jsonWrite(res,{'code':504,'msg':'有毒'})
				}
				jsonWrite(res,{'code':0,'msg':'成功'})
				connection.release();
			})
		})
	},
	
	addLike: function(req,res,next){
		pool.getConnection(function(err,result){
			if(err){
				console.log(err)
			}
			connection.query($sql.updateBlogLike,[parma.likes,parma.id],function(err,result){
				if (err) {
					jsonWrite(res,{'code':504,'msg':'有毒'})
				}
				jsonWrite(res,{'code':0,'msg':'成功'})
				connection.release();
			})
		})
	},
	
	addDislike: function(req,res,next){
		pool.getConnection(function(err,result){
			if(err){
				console.log(err)
			}
			connection.query($sql.updateBlogDislike,[parma.dislikes,parma.id],function(err,result){
				if (err) {
					jsonWrite(res,{'code':504,'msg':'有毒'})
				}
				jsonWrite(res,{'code':0,'msg':'成功'})
				connection.release();
			})
		})
	},
	
	addBBS:function(req,res,next){
		pool.getConnection(function(err,result){
			if (err) {
				console.log(err)
			}
			var parma = req.body
			var id = uuid.v4().replace(/-/g,'');
			connection.query($sql.addBBS,[id,articleId,userId,message,createTime],function(err,result){
				if (err) {
					jsonWrite(res,{'code':504,'msg':'有毒'})
				}
				jsonWrite(res,{'code':0,'msg':'成功'})
				connection.release();
			})
		})
	},
	
	queryBBS: function(req,res,next){
		pool.getConnection(function(err,connection){
			if (err) {
				console.log(err)
			}
			var page = req.body.page
			var limit = req.body.limit
			var left = (page*limit)-(limit*1);
			var right = (1*limit);
			connection.query($sql.queryBBS,[left,right],function(err,result){
				if (err) {
					jsonWrite(res,{'code':504,'msg':'有毒'})
				}
				jsonWrite(res,{'code':0,'data':result,'msg':'成功'})
				connection.release();
			})
		})
	}
	
}
