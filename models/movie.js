var mongoose = require('./mongodb');

var Schema = mongoose.Schema;

var MovieSchema = new Schema({
		name : String,
		alias : [String],
		publish : Date,
		create_date : { type: Date, default: Date.now},
		images :{
		coverSmall:String,
		coverBig:String,
	},
	source :[{
		source:String,
		link:String,
		swfLink:String,
		quality:String,
		version:String,
		lang:String,
		subtitle:String,
		create_date : { type: Date, default: Date.now }
	}]
});

var Movie = mongoose.model("Movie", MovieSchema);

var MovieDAO = function(){};

//增加数据
MovieDAO.prototype.save = function(obj, callback) {

	var instance = new Movie(obj);

	instance.save(function(err){

		if (err) return console.error(err);
		callback(err);

	});
};

//查找数据
MovieDAO.prototype.findByName = function(name, callback) {

	Movie.find( name, function(err, obj){

		callback(err, obj);
	});
};

//删除数据
MovieDAO.prototype.del = function(name, callback){

	Movie.remove(name, function(err, obj){
		callback(err, obj);
	})
}
//更新数据
MovieDAO.prototype.update = function(name, callback){

	Movie.update(name.old, name.new, function(err, obj){
		callback(err, obj);
	});
}

module.exports = new MovieDAO();