var mysql = require('mysql');
var $conf = require('../db/db');
var $sql = require('./noticeSql.js');
var $common = require('../public/common');
// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

module.exports = {
    saveNotice:function(req,res,next){
        pool.getConnection(function(err,connection){
            if (err) {
                $common.linkMysqlError(res,err);
                $common.writeErrorLog('link',err);
            };
            var parma = req.body;
            connection.query($sql.saveNotice,[parma.notice,parma.color],function(err,result){
                if (err) {
                    $common.queryMysqlError(res,err);
                    $common.writeErrorLog('query',err);
                } else {
                    $common.saveSuccess(res);
                    connection.release();
                }
            })
        })
    },
    queryNotice:function(req,res,next){
        pool.getConnection(function(err,connection){
            if (err) {
                $common.linkMysqlError(res,err);
                $common.writeErrorLog('link',err);
            };
            connection.query($sql.queryNotice,function(err,result){
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
    deleteNotice:function(req,res,next){
        pool.getConnection(function(err,connection){
            if (err) {
                $common.linkMysqlError(res,err);
                $common.writeErrorLog('link',err);
            };
            var parma = req.body;
            connection.query($sql.deleteNotice,[parma.id],function(err,result){
                if (err) {
                    $common.queryMysqlError(res,err);
                    $common.writeErrorLog('query',err);
                } else {
                    $common.deleteSuccess(res);
                    connection.release();
                }
            })
        })
    },
    updateNotice:function(req,res,next){
        pool.getConnection(function(err,connection){
            if (err) {
                $common.linkMysqlError(res,err);
                $common.writeErrorLog('link',err);
            };
            var parma = req.body;
            connection.query($sql.updateNotice,[parma.notice,parma.color,parma.id],function(err,result){
                if (err) {
                    $common.queryMysqlError(res,err);
                    $common.writeErrorLog('query',err);
                } else {
                    $common.updateSuccess(res);
                    connection.release();
                }
            })
        })
    }
}