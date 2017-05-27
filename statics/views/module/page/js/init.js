/*
 *name:dtt
 *time:2016.7.27
 *content:分页js
*/

define(function(require, exports, module) {
	//var pgLebShow=function(cur,start,data,type,pgRowNu,pageMax){
	var pgLebShow=function(cur,start,data,type,pageMax){
		/*
		 * cur:当前页码;
		 * start:状态分为: "fast":首页;"up":上一页;"down":下一页;"last":末页;
		 * data:成功返回的数据,主要获取总数据个数;
		 * type:为显示分页类型；
		 */
			//pgRowNu=pgRowNu||10;
			pgRowNu=10;
		var tal=data.totalRow/pgRowNu;
		pageMax=pageMax||30;
		$("#pageCal").val(data.totalRow);
		var maxpg=parseInt(tal)>=pageMax?pageMax:(tal.toString().indexOf(".")>-1)?parseInt(tal)+1:parseInt(tal);
		var pgst=type=='list'?'第<i class="pg">'+(cur+1)+'</i>页/共<i class="cal">'+maxpg+'</i>页<a data-page="fast" href="javascript:void(0);">首页</a><a data-page="up" href="javascript:void(0);">上一页</a>':'<span class="l">第<i class="pg">'+(cur+1)+'</i>页/共<i class="cal">'+maxpg+'</i>页<a data-page="fast" href="javascript:void(0);">首页</a></span><a class="up" data-page="up" href="javascript:void(0);">上一页</a>';
		var pged=type=='list'?'<a data-page="down" href="javascript:void(0)">下一页</a><a data-page="last" href="javascript:void(0)">末页</a>':'<a class="down" data-page="down" href="javascript:void(0)">下一页</a><span class="l"><a data-page="last" href="javascript:void(0)">末页</a></span>';
		switch(start){
			case "fast"://首页
				if(maxpg>5){
					pgst+='<a data-page="un" class="cur" href="javascript:void(0);">1</a><a data-page="un" href="javascript:void(0);">2</a><a data-page="un" href="javascript:void(0);">3</a><a data-page="un" href="javascript:void(0);">4</a><a data-page="un" href="javascript:void(0);">5</a>';
				}else{
					for(var i=0;i<maxpg;i++){
						pgst+='<a data-page="un" href="javascript:void(0);">'+(i+1)+'</a>';
					}
				}
				$("div.page").html(pgst+pged);
				$(".page a[data-page='un']:first").addClass("cur");
			break;
			case "up"://上一页
				if(cur<4&&maxpg>=5){
					for(var i=1;i<6;i++){
						pgst+='<a data-page="un" href="javascript:void(0);">'+i+'</a>';
					}
					$("div.page").html(pgst+pged);
					$(".page a[data-page='un']:contains('"+(cur+1)+"')").addClass("cur");
				}else if(cur<4&&maxpg<5){
					var pgt=parseInt(maxpg)+1;
					for(var i=1;i<pgt;i++){
						pgst+='<a data-page="un" href="javascript:void(0);">'+i+'</a>';
					}

					$("div.page").html(pgst+pged);
					$(".page a[data-page='un']:contains('"+(cur+1)+"')").addClass("cur");
				}else{
					for(var i=cur-2;i<(cur+3);i++){
						pgst+='<a data-page="un" href="javascript:void(0);">'+i+'</a>';
					}
					$("div.page").html(pgst+pged);
					$(".page a[data-page='un']:last").prev().addClass("cur");
				}
			break;
			case "down"://下一页
				var pgt=parseInt(maxpg)+1;
				if((maxpg-5)<cur&&maxpg>0){
					for(var i=(maxpg-4);i<pgt;i++){
						pgst+='<a data-page="un" href="javascript:void(0);">'+i+'</a>';
					}
					$("div.page").html(pgst+pged);
					$(".page a[data-page='un']:contains('"+(cur+1)+"')").addClass("cur");
				}else{
					for(var i=(cur);i<(cur+5);i++){
						pgst+='<a data-page="un" href="javascript:void(0);">'+i+'</a>';
					}
					$("div.page").html(pgst+pged);
					$("div.page a[data-page='un']:eq(1)").addClass("cur");
				}
			break;
			case "last"://末页
				if(maxpg>cur){
					var maxtopg=maxpg-5>0?maxpg-5:0;
					for(var i=maxtopg;i<maxpg;i++){
						pgst+='<a data-page="un" href="javascript:void(0);">'+(i+1)+'</a>';
					}
				}
				$("div.page").html(pgst+pged);
				$("div.page a[data-page='un']:last").addClass("cur");
			break;
			default:;
		}
		$(".page i.pg").html(cur+1);
	};


	//exports.pages=function(getUrl,pgSuccer,imgUrl,lebCur,pgCur,pgRowNu,type,pageMax,data,tabIndex){
	exports.pages=function(getUrl,pgSuccer,lebCur,pgCur,type,pageMax){
			/*
			getUrl:异步请求地址；
			pgSuccer：返回成功处理方法；
			lebCur:当前所在标签;
			imgUrl：加载Loding图片地址；
			pgCur：显示当前页码;
			//pgRowNu:当前页显示数据个数;
			type:分类显示类型为list,detail；
			pageMax:最大可显示多少页，默认30页；
			data:查询参数，URL问号后附加
			tabIndex:多tab加载数据时的tab索引值
			*/
		var pgCur=pgCur||1,
			//pgRowNu=pgRowNu||10,
			//data = data ? "?"+data : "",
			tabIndex = tabIndex || 1,
			//imgLabel='<img src="'+imgUrl+'/res/images/loading.gif" />',
			imgLabel='<img src="/res/images/loading.gif" />',
			pgDataFun=function(cur,start){
				$(lebCur).html('<span class="loding-img">'+imgLabel+'</span>');
				cur=cur-1||0;
				$.ajaxSetup({cache:false});
				//$.get(getUrl+cur+"/"+pgRowNu+data,function(data){
				$.get(getUrl+cur,function(data){
					if(data.totalRow!=0&&data.totalRow!=null){
						//pgLebShow(cur,start,data,type,pgRowNu,pageMax);//分页显示
						pgLebShow(cur,start,data,type,pageMax);//分页显示
					}
					pgSuccer(data,tabIndex);//回调成功处理
				},"json");
			},
			clickPg=function(tmp){
				var $th=$(tmp),
					afirst=$("a[data-page='un']:first"),
					alast=$("a[data-page='un']:last"),
					cur=$th.attr("data-page")=="un"?parseInt($th.html()):parseInt($(".page a[data-page='un'].cur").html()),
					cal=parseInt($(".page .cal").html());
					switch($th.attr("data-page")){
						case "fast"://首页
							if(cur!=1){
								pgDataFun(1,'fast');
							}
						break;
						case "up"://上一页
							if(afirst.next().hasClass("cur")&&cur!=1){
								pgDataFun(cur-1,'up');
							}else if(afirst.hasClass("cur")&&cur==1){
								return;
							}else{
								$(".page .cur").prev().addClass("cur").siblings().removeClass("cur");
								pgDataFun(cur-1);
							}
						break;
						case "un"://当前显示页码
							if($(".page a[data-page='un'].cur").html()!=$th.html()){
								if((afirst.html()==$th.html())&&$th.html()!=1){//console.info("up");
									pgDataFun(parseInt($th.html()),'up');
								}else if((alast.html()==$th.html())&&$th.html()!=cal){//console.info("down");
									pgDataFun(parseInt($th.html()),'down');
								}else{//console.info("cur");
									$th.addClass("cur").siblings().removeClass("cur");
									pgDataFun(parseInt($th.html()));
								}
							}
						break;
						case "down"://下一页
							if(alast.prev().hasClass("cur")&&cur!=(cal-1)){
								pgDataFun(cur+1,'down');
							}else if(alast.hasClass("cur")&&cur==cal){
								return;
							}else{
								$(".page .cur").next().addClass("cur").siblings().removeClass("cur");
								pgDataFun(cur+1);
							}
						break;
						case "last"://末页
							if(cal!=cur){
								pgDataFun(cal,'last');
							}
						break;
						default:;
					}
			},
			clickPage=function(){
				$("div.page").delegate('a','click',function(event){
					event.preventDefault();
					clickPg(this);
					return false;
				});
			};
			clickPage();
			pgDataFun(pgCur,'fast');
			return this;
		}
});
