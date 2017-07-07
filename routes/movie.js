var Movie = require('../models/movie.js');

exports.doMovieAdd = function(req, res) {

	var json = req.body;

	Movie.save(json, function(err){
		if(err) {
			res.send({'success':false,'err':err});
		} else {
			res.send({'success':true});
		}
	});
	
};

exports.query = function(req, res) {

	Movie.findByName( req.body,function(err, obj){

		if(err) {
			res.send({'success':false,'err':err});
		} else {
			
			res.send({'success':true, 'data': obj});
		}
	});
}

exports.del = function(req, res){

	Movie.del( req.body,function(err, obj){

		if(err) {
			res.send({'success':false,'err':err});
		} else {
			
			res.send({'success':true,});
		}
	});
}

exports.update = function(req, res){

	Movie.update( req.body,function(err, obj){

		if(err) {
			res.send({'success':false,'err':err});
		} else {
			
			res.send({'success':true,});
		}
	});
}