let search = require('../conf/query.js');

//测试接口
search.query({"name":'菜鸟教程'}, function(result){
	return result;
});
