/*
 *name:wj
 *time:2017.05.19
 *content:导航提取
*/
define(function(require, exports, module) {

	$(function(){
		var page = {

			init: function(){

				this.initNav();

				this.gtUrl();

				this.ajaxSuccess();
			},
			initNav: function(){

				var $li = $('.info-nav li');

				$li
				.on('mouseenter', function(){
					$(this).find('.child-menu').stop(true, true).slideDown();
				})
				.on('mouseleave', function(){
					$(this).find('.child-menu').stop(true, true).slideUp();	
				});

				//设置当前页面 对应的 导航样式
				var curPage = $('#menuCur').val();

				if(curPage){
					$('#' + curPage).addClass('cur');
				}
				// var curIndex = {
				// 	platform: 0, //平台数据
				// 	security: 1, //安全保障
				// 	aboutMt: 2, //关于民投
				// 	company: 3, //公司动态
				// 	statute: 4 //监管法规
				// };
				//$li.eq(0).addClass('cur');

			},
			gtUrl: function(){

				//需登录跳转地址
				$("body").delegate("#gotoLoginId","click",function(){
					var $th=$(this),url=$th.data("url")?$th.data("url"):"",tg=$th.data("tg")?$th.data("tg"):"",alt=$th.data("alt")?$th.data("alt"):"";
					gtUrl.gotoUrl(url,tg,alt);
				});
			},
			ajaxSuccess: function(){
				//ajax请求成功处理缓存失效
				$(document).ajaxSuccess(function(evt, request, settings){
					if(request.getResponseHeader("error_code") != null){
						location.reload();
					}
				});
			}
		}

		page.init();
	});
});
