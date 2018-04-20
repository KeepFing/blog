var express = require('express');
var router = express.Router();
var dao = require('../dao/upload.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', function(req,res,next){
	console.log(req.body)
});
router.post('/uploader', function(req, res, next) {
  	dao.upload(req,res,next)
});
module.exports = router;
