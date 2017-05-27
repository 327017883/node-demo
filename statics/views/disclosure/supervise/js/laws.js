$(function(){
	$(".lawsList a").click(function(){

		var url=$(this).data("url");
		var title=$(this).data("title");
		$.dialog({
			title:title,
			width:800,
			height:600,
			id:"lay",
			max: false,
			opacity: 0.3,
			background:'#000',
			padding:0,
    		min: false,
			content:'<iframe class="iframe-height" src="'+url+'" marginheight="0" marginwidth="0" frameborder="0" width="800" height="600"></iframe>'
		});
	});

})