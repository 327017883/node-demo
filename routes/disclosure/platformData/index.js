let express = require('express');
let request = require('request');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {	

  let data = {
  	title: '平台数据'
  };

  /*渲染模板*/
  res.render('disclosure/platformData/index', data);
		
});

module.exports = router;