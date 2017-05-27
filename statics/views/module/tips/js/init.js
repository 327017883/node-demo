/*
 *name:dtt
 *time:2014.9.30
 *content:回到顶部、计算浮动区
*/
define(function(require, exports, module) {
    var milFt=require('../../../js/operation.js');//加载千元符

    $(function(){

        $(".gotoTop").click(function(){
            $('body,html').animate({scrollTop:0},800);
            return false;
        });


        //理财计算器
        var doalogStr="<div class='mt-dialog'><div class='dialog-bg'></div><div class='dialog-con'><div class='dialog-title'><span class='title-txt'>收益计算器</span><span class='dialog-close-btn'></span></div><div class='dialog-form'><div class='form-list'><span>投资金额</span><input type='text' value='10000' id='je'/><span class='unit'>元</span></div><div class='form-list'><span>投资天数</span><input type='text' id='qx'/><span class='unit'>天</span></div><div class='form-list'><span>预期年化</span><input type='text' id='ll'/><span class='unit'>%</span></div><div class='form-list'><span>预期收益</span><span class='profits' id='profits'>0.00</span><span>元</span></div><a class='result-btn'>计算</a></div></div></div>";

        $(document).delegate(".result-btn","click",function(){
            var je=$("#je").val()*1;
            var qx=$("#qx").val()*1;
            var ll=$("#ll").val()*1;
            var rs=milFt.operation(je,qx,"*");
            rs=milFt.operation(rs,ll,"*");
            rs=milFt.operation(rs,36000,"/");
            //var rs=je*qx/360*ll/100;
            rs=rs?rs:0;
            $("#profits").text(milFt.toFixed(rs,2,3,true));
        })

        $(document).delegate(".dialog-close-btn","click",function(){
            $(".mt-dialog").remove();
        })
        $(".calculator").click(function(){
            $("body").append(doalogStr);
        })

    });
});
