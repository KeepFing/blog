var mysql = require('mysql');
var $conf = require('../db/db');
var $sql = require('./linkSql.js');
var $common = require('../public/common');
//var $util = require('../util/util');
//var $sql = require('./wxbugSqlMapping');
//var uuid = require('node-uuid');

//const crypto = require("crypto");

// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

module.exports = {
    /**
     *新增底部链接
     */
    saveLink:function(req,res,next){
        pool.getConnection(function(err,connection){
            if(err){
                $common.linkMysqlError(res,err);
            };
            var parma = req.body;
            connection.query($sql.saveLink,[parma.name,parma.url,parma.order,parma.remark],function(err,result){
                if (err) {
                    $common.queryMysqlError(res,err)
                } else {
                    $common.saveSuccess(res);
                    connection.release();
                }
            })
        })
    },
    /**
     * 查询底部链接
     */
    queryLink:function(req,res,next){
        pool.getConnection(function(err,connection){
            if (err) {
                $common.linkMysqlError(res,err);
                $common.writeErrorLog('link',err);
            };
            connection.query($sql.queryLink,function(err,result){
                if (err) {
                    $common.queryMysqlError(res,err);
                    $common.writeErrorLog('query',err);
                } else {
                    $common.querySuccess(res,result);
                    connection.release();
                }
            })
        })
    },
    /**
     * 删除底部链接
     */
    deleteLink:function(req,res,next){
        pool.getConnection(function(err,connection){
            if (err) {
                $common.linkMysqlError(res,err);
            };
            var parma = req.body;
            connection.query($sql.deleteLink,[parma.id],function(err,result){
                if (err) {
                    $common.queryMysqlError(res,err)
                } else {
                    $common.deleteSuccess(res);
                    connection.release();
                }
            })
        })
    },
    /**
     * 修改底部链接
     */
    updateLink:function(req,res,next){
        pool.getConnection(function(err,connection){
            if (err) {
                $common.linkMysqlError(res,err);
            };
            var parma = req.body;
            connection.query($sql.updateLink,[parma.name,parma.url,parma.order,parma.remark,parma.id],function(err,result){
                if (err) {
                    $common.queryMysqlError(res,err);
                } else {
                    $common.updateSuccess(res);
                    connection.release();
                }
            })
        })
    },
    /**
     * 测试接口
     */
    test:function(req,res,next){
        pool.getConnection(function(err,connection){
            var parma = req.body;
            console.log(parma)
            var len = parma.ids.length;
            connection.query($sql.test,[parma.ids],function(err,result){
                if (result.affectedRows == len) {
                    $common.querySuccess(res,result);
                }
                connection.release();
            });
        })
    }
}