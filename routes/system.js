var express = require('express');
var router = express.Router();
var dao = require('../dao/menu.js');
var linkDao = require('../dao/link');
var noticeDao = require('../dao/notice');
/**
 * 路由———查询菜单
 */
router.post('/queryMenu',function(req,res,next){
	dao.queryMenu(req,res,next)
});
/**
 * 路由———删除菜单
 */
router.post('/deleteMenu',function(req,res,next){
    dao.deleteMenu(req,res,next);
});
/**
 * 路由———修改菜单
 */
router.post('/updateMenu',function(req,res,next){
  dao.updateMenu(req,res,next);  
});
/**
 * 路由———新增菜单
 */
router.post('/saveMenu',function(req,res,next){
    dao.saveMenu(req,res,next);
});
/**
 * 新增链接
 */
router.post('/saveLink',function(req,res,next){
    linkDao.saveLink(req,res,next);
});
/**
 * 查询链接
 */
router.post('/queryLink',function(req,res,next){
    linkDao.queryLink(req,res,next);
})
/**
 * 修改
 */
router.post('/updateLink',function(req,res,next){
    linkDao.updateLink(req,res,next);
})
/**
 * 删除
 */
router.post('/deleteLink',function(req,res,next){
    linkDao.deleteLink(req,res,next);
});
/**
 * 新增通知
 */
router.post('/saveNotice',function(req,res,next){
    noticeDao.saveNotice(req,res,next);
})
/**
 * 查询通知
 */
router.post('/queryNotice',function(req,res,next){
    noticeDao.queryNotice(req,res,next);
});
/**
 * 
 */
router.post('/deleteNotice',function(req,res,next){
    noticeDao.deleteNotice(req,res,next);
});
/**
 * 
 */
router.post('/updateNotice',function(req,res,next){
    noticeDao.updateNotice(req,res,next);
});


/**
 * 测试接口的路由
 */
router.post('/test',function(req,res,next){
    linkDao.test(req,res,next);
});
module.exports = router;