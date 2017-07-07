var Movie = require('../models/movie.js');

exports.movieAdd = function(req, res) {

	if(req.params.name){//update
		return res.render('movie', {
			title:req.params.name+'|电影|管理|moive.me',
			label:'编辑电影:'+req.params.name,
			movie:req.params.name
			});
		} 
	else {
		return res.render('movie',{
				title:'新增加|电影|管理|moive.me',
				label:'新增加电影',
				movie:false
			});
	}
};

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