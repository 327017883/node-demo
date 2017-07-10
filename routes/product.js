var Product = require('../models/product.js');

exports.doMovieAdd = function(req, res) {

	var json = req.body;

	Product.save(json, function(err){
		if(err) {
			res.send({'success':false,'err':err});
		} else {
			res.send({'success':true});
		}
	});
	
};

exports.query = function(req, res) {

	Product.findByName( req.body,function(err, obj){

		if(err) {
			res.send({'success':false,'err':err});
		} else {
			
			res.send({'success':true, 'data': obj});
		}
	});
}

exports.del = function(req, res){

	Product.del( req.body,function(err, obj){

		if(err) {
			res.send({'success':false,'err':err});
		} else {
			
			res.send({'success':true,});
		}
	});
}

exports.update = function(req, res){

	Product.update( req.body,function(err, obj){

		if(err) {
			res.send({'success':false,'err':err});
		} else {
			
			res.send({'success':true,});
		}
	});
}