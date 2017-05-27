

define(function(require, exports, module) {

	require('../../../module/headInfo/js/init.js');

	$(function(){
		var animateFun=false;
		$(".prev").click(function(){
			var wrap=$(this).parent().next(".honorCon").find(".honorWrap");
			var left=wrap.css("left").replace("px","")*1;
			var child=wrap.find(".honorList").length;
			var childW=334;
			var nowIndex=Math.abs(parseInt(left/childW));
			if(nowIndex>0&&!animateFun){
				wrap.css("left",left+childW);
				animateFun=true;
				setTimeout(function(){animateFun=false},300);
			}
		});
		$(".next").click(function(){
			var wrap=$(this).parents(".honors").find(".honorWrap");
			var left=wrap.css("left").replace("px","")*1;
			var child=wrap.find(".honorList").length;
			var childW=334;
			var nowIndex=Math.abs(parseInt(left/childW));
			if(nowIndex<(child-3)&&!animateFun){
				wrap.css("left",left-childW);
				animateFun=true;
				setTimeout(function(){animateFun=false},300);
			}
		});

		$('.info-nav li').eq(1).addClass('cur');
	});

});
