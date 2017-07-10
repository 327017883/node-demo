

define(function(require, exports, module) {

	var mdata={};

	var url = staticRoot + 'js/movie.json';


	$.getJSON(url, function(data) {

		rendData(data);
	});

	function rendData(data){

		$('#areaId').val(JSON.stringify(data));

		$('#btnSub').on('click', function(){

			// $.ajax({
			// 	type: "POST",
			// 	url: '/movie/add',
			// 	dataType: 'json',
			// 	data: data,
			// 	success: function (data, textStatus){
			// 		if(data.success){
			// 			//console.log(data)				
			// 		}
			// 	},
			// 	error: function(data, textStatus){
			// 		//console.log(data)
			// 	}
			// });

			ajaxJson({
				method: 'post',
				data: data,
				url: '/movie/add',
				success: function(data){
					console.log(data)
				}
			});
		});
	}

	//查找数据
	$('#btnQuery').on('click', function(){

		ajaxJson({
				method: 'post',
				data: {name: '未来警察'},
				url: '/movie/query',
				success: function(data){
					console.log(data.data)
				}
		});
	})

	//删除数据
	$('#btnDel').on('click', function(){

		ajaxJson({
				method: 'post',
				data: {name: '未来警察'},
				url: '/movie/del',
				success: function(data){
					console.log(data)
				}
		});
	});

	//更新数据
	$('#btnUpdate').on('click', function(){
		ajaxJson({
				method: 'post',
				data: {old: {name: '未来警察'}, new: {name: 'a'}},
				url: '/movie/update',
				success: function(data){
					console.log(data)
				}
		});
	})
});

function ajaxJson(options){

	var xhr = new XMLHttpRequest();
	xhr.timeout = options.timeout || 3000;
	xhr.responseType = options.contentType || 'json';
	xhr.open( options.method || 'POST', options.url);

	xhr.setRequestHeader('Content-Type','application/json');

	xhr.onreadystatechange = function(){
　　　　if ( xhr.readyState == 4 && xhr.status == 200 ) {
			 options.success && options.success(xhr.response);
　　　　}
　　};
	
	xhr.send(JSON.stringify(options.data));
}