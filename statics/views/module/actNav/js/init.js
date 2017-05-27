/*
 *name:dtt
 *time:2016.08.05
 *content:我的账户中心，左则列表菜单
*/

define(function(require, exports, module) {
	require('../../../plugIn/poshytip-1.2/src/jquery.poshytip.js');

	//当前选中菜单
	if($("#userNavList").length>0){
		var $th=$("#userNavList"),
		iptVal=$th.val();
		/*
		index:账户总览
		regular:定期理财
		change:零钱计划
		record:交易明细
		datum:我的资料
		bankCard:银行卡
		setUp:提醒设置
		datum:安全中心
		coupon:优惠券
		planner:推荐有奖
		*/
		$(".act-left ul.act-nav>li[data-type='"+iptVal+"']").addClass("cur");
	}
	
	//提示信息
	$('.ztitle').poshytip({alignTo: 'target',alignX: 'inner-left',alignY: 'bottom',offsetX:-13,offsetY:8});

});
