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
	//查询所有的博客需要分页
	queryBlog: function(req,res,next){
		pool.getConnection(function(err,connection){
			if (err) {
				console.log(err)
			}
			var page = req.body.page
			var limit = req.body.limit
			var left = (page*limit)-(limit*1);
			var right = (1*limit);
			connection.query($sql.queryBlog,[left,right],function(err,result){
				connection.query('SELECT count(0) as total from article_t',function(err,result1){
					console.log(result1)
					var obj = {"code":0,'data':result,'total':result1[0].total,'pageSize':limit,'page':page,"msg":"成功"}
					jsonWrite(res,obj)
				})
				connection.release();
			})
		})
	},
	//按关键字查询所有的博客
	queryBlogByKey: function(req,res,next){
		pool.getConnection(function(err,connection){
			if(err){
				console.log(err)
			}
			var parma = req.body
			var page = req.body.page
			var limit = req.body.limit
			var left = (page*limit)-(limit*1);
			var right = (1*limit);
			connection.query($sql.queryBlogByKey,[parma.key,left,right],function(err,result){
				if(err){
					jsonWrite(res,{'code':504,'msg':'有毒'})
				}
				jsonWrite(res,{'code':0,'data':result,'msg':'成功'})
				connection.release()
			})
		})
	},
	
	//添加一个文章，需要传入文章的标题、副标题、作者、内容、类别、创建时间6个参数
	saveBlog: function(req,res,next){
		pool.getConnection(function(err,connection){
			if (err) {
				console.log(err)
			}
			var parma = req.body
			var id = uuid.v4().replace(/-/g,'');
			connection.query($sql.saveBlog,[id,parma.title,parma.subTitle,parma.author,parma.content,parma.typeId,parma.createTime,0,0,0],function(err,result){
				if(err){
					jsonWrite(res,{'code':504,'msg':'有毒'})
				}
				jsonWrite(res,{'code':0,'msg':'成功'})
				connection.release();
			})
		})
	},
	//在文章被点击的时候调用addWatchTimes接口，表示被阅读次数加一
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
	//文章的最后有两个按钮，喜欢和不喜欢，这是点击喜欢的按钮，需要传入累计的数
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
	//文章的最后有两个按钮，喜欢和不喜欢，这是点击喜欢的按钮，需要传入累计的数
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
	//这是文章评论的接口，需要传入文章id，用户id，评论内容和时间4个参数
	addBBS:function(req,res,next){
		pool.getConnection(function(err,result){
			if (err) {
				console.log(err)
			}
			var parma = req.body
			var id = uuid.v4().replace(/-/g,'');
			connection.query($sql.addBBS,[id,parma.articleId,parma.userId,parma.message,parma.createTime],function(err,result){
				if (err) {
					jsonWrite(res,{'code':504,'msg':'有毒'})
				}
				jsonWrite(res,{'code':0,'msg':'成功'})
				connection.release();
			})
		})
	},
	//这是查询文章评论的接口，需要传入文章id，用户id，评论内容和时间4个参数
	queryBBS: function(req,res,next){
		pool.getConnection(function(err,connection){
			if (err) {
				console.log(err)
			}
			var page = req.body.page
			var limit = req.body.limit
			var left = (page*limit)-(limit*1);
			var right = (1*limit);
			connection.query($sql.queryBBS,[req.body.articleId,left,right],function(err,result){
				if (err) {
					jsonWrite(res,{'code':504,'msg':'有毒'})
				}
				jsonWrite(res,{'code':0,'data':result,'msg':'成功'})
				connection.release();
			})
		})
	}
	
}
