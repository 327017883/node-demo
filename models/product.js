var mongoose = require('./mongodb');
let moment = require('moment');
let async = require('async');

var Schema = mongoose.Schema;

var MovieSchema = new Schema({
		id: Number,
		name : String,
		type : String,
		transactionTime : String,
		create_date : { type: String, default: moment(new Date()).format("YYYY-MM-DD")}
});

var Product = mongoose.model("Product", MovieSchema);

var ProductDAO = function(){};

//增加数据
ProductDAO.prototype.save = function(obj, callback) {

	var instance = new Product(obj);

	instance.save(function(err){

		if (err) return console.error(err);
		callback && callback(err);

	});
};

//查找数据
ProductDAO.prototype.findByName = function(name, fn) {

	function getCount(fn1){
		Product.count({}, function(err, obj){
			fn1(null, obj)
		});
	}

	function getAll(fn2){

		Product.find({}, function(err, obj){
			fn2(null, obj)
		}).limit(10).skip(name.start);
	}

	async.series([getCount, getAll],function(err,result){  

 		let o = {
 			count: result[0],
 			data: result[1]
 		};

	    fn(err, o);
	});

};

//删除数据
ProductDAO.prototype.del = function(name, callback){

	Product.remove(name, function(err, obj){
		callback(err, obj);
	})
}
//更新数据
ProductDAO.prototype.update = function(name, callback){

	Movie.update(name.old, name.new, function(err, obj){
		callback(err, obj);
	});
}

module.exports = new ProductDAO();