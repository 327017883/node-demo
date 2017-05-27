/*
 *name:dtt
 *time:2017.04.21
 *content:导航提取
*/
define(function(require, exports, module) {
	var gtUrl=require('../../../js/gotoUrl.js');
	require('../../../module/tips/js/init.js');
    var $head=$(".head"),$menu=$head.find(".menu"),width=$menu.width();
	function initMenuTage(){
		if($("#menuCur").length>0){
			var menuClass=$("#menuCur").val();
			var index=$(".head .menus .menu[data-type='"+menuClass+"']").index();
			var left = index*width+45;
			$(".menus i").css("left",left).show();
		}else{
			$(".menus i").css({"left":0,"display":"none"});
		}
	};
	initMenuTage();
	$menu.mouseover(function(){
		var index = $(this).index();
		var left = index*width+45;
		$(".menus i").css("left",left).show();
	})
	$(".head .menus").mouseleave(initMenuTage);


    function initHead(){
		if($("#menuCur").length>0 && $("#menuCur").val()=="index"){
			$(".footer .seo").css("height","35px");
	        var t=$(this).scrollTop();
	        if(t>540){
	            $head.removeClass("home").addClass("fixed");
	        }else{
	            $head.removeClass("fixed").addClass("home");
	        }
		}
    }
    initHead();
    $(window).scroll(initHead);




    //需登录跳转地址
	$("body").delegate("#gotoLoginId","click",function(){
		var $th=$(this),url=$th.data("url")?$th.data("url"):"",tg=$th.data("tg")?$th.data("tg"):"",alt=$th.data("alt")?$th.data("alt"):"";
		gtUrl.gotoUrl(url,tg,alt);
	});

	//ajax请求成功处理缓存失效
	$(document).ajaxSuccess(function(evt, request, settings){
		if(request.getResponseHeader("error_code") != null){
			location.reload();
		}
	});

	require('../../../js/statisticsBaidu.js');//百度统计
});
