var express = require('express');
var router = express.Router();
var dao = require('../dao/article.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/**
 * 查询所有文章
 */
router.post('/queryBlog',function(req,res,next){
	console.log("queryblog")
	dao.queryBlog(req,res,next)
});

router.post('/queryBlogByKey',function(req,res,next){
	console.log("queryblog")
	dao.queryBlogByKey(req,res,next)
});

router.post('/saveBlog',function(req,res,next){
	dao.saveBlog(req,res,next)
});

router.post('/addWatchTimes',function(req,res,next){
	dao.addWatchTimes(req,res,next)
});

router.post('/addLike',function(req,res,next){
	dao.addLike(req,res,next)
});

router.post('/addDislike',function(req,res,next){
	dao.addDislike(req,res,next)
});

router.post('/addBBS',function(req,res,next){
	dao.addBBS(req,res,next)
});

router.post('/queryBBS',function(req,res,next){
	dao.queryBBS(req,res,next)
});

router.post('/queryBlogByType',function(req,res,next){
	dao.queryBlogByType(req,res,next);
});

router.post('/queryBlogByReadTimes',function(req,res,next){
	dao.queryBlogByReadTimes(req,res,next);
});

router.post('/queryBlogById',function(req,res,next){
	dao.queryBlogById(req,res,next);
});

router.post('/queryBlogType',function(req,res,next){
	dao.queryBlogType(req,res,next);
})



module.exports = router;
