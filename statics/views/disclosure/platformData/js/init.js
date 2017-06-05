define(function(require, exports, module) {

	require('../../../module/headInfo/js/init.js');

	var t = require('./data-test.js');
	$('.info-nav li').eq(0).addClass('cur');

	$(function(){

		var page = {
			init: function(){

				this.webSocket();

				//每月交易总额 柱状图 初始化
				this.platformTransactTotal();

				//每月交易笔数 线形 初始化
				this.platformTransactCount();

				//每月借款总额 柱状图 初始化
				this.financingEnterprisetTotal();

				//每月借款笔数 线形 初始化
				this.financingEnterpriseCount();

				//投资人数据 按 年龄分布
				this.investorAge();

				//投资人数据 按 投资额分布
				this.investorTotal();

				//地图 初始化
				this.areaMap();

				//运营报告 banner 切换
				this.operationBanner();

			},
			webSocket: function(){
				
				let ws = new WebSocket('ws://192.168.0.87:8080/');

				// ws.onopen = function () {
				  
				// }

				// switch (ws.readyState) {
				//   case WebSocket.CONNECTING:
				//     // do something
				//     break;
				//   case WebSocket.OPEN:
				//     	ws.send('Hello Server!');
				//     break;
				//   case WebSocket.CLOSING:
				//     // do something
				//     break;
				//   case WebSocket.CLOSED:
				//     // do something
				//     break;
				//   default:
				//     // this never happens
				//     break;
				// }
				
				// ws.onmessage = function(event){
				// 	if(typeof event.data === String) {
				// 		console.log("Received data string");
				// 	}

				// 	if(event.data instanceof ArrayBuffer){
				// 		var buffer = event.data;
				// 		console.log("Received arraybuffer");
				// 	}
				// }
				// ws.onerror = function(event) {
				//   console.log(event)
				// };

				//ws.send('your message');
			},
			platformTransactTotal: function(){

				  var $platformTransactTotal = $('#platformTransactTotal');
				  var data = [499.9, 2000, 656.4, 0, 0, 0, 0, 0, 0, 0, 0, 0];

				  $platformTransactTotal.highcharts({
				        chart: {
				            type: 'column'
				        },
				        title: {
				            text: '每月交易总额（万元）'
				        },	
				        credits: {
				        	enabled: false
				        },	
				        legend: {
				        	enabled: false
				        },		   
				        xAxis: {
				            categories: [
				                '一月',
				                '二月',
				                '三月',
				                '四月',
				                '五月',
				                '六月',
				                '七月',
				                '八月',
				                '九月',
				                '十月',
				                '十一月',
				                '十二月'
				            ],
				            crosshair: true
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: ''
				            },
				            tickAmount: 6,
				            className: 'y-sl'            
				        },
				        plotOptions: {
				            series: {
				                borderWidth: 0,
				                dataLabels: {
				                    enabled: true,
				                    format: '{point.y}',
				                    style: {
				                    	color: '#404040',
				                    	fontSize: '14px',
				                    	fontWeight: 'normal'
				                    }
				                }
				            }
				        },
				        colors: ['#ff6460'],
				        tooltip: {
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
				            footerFormat: '</table>',
				            shared: false,
				            useHTML: false,
				            enabled: false
				        },				       
				        series: [{
				            data: data
				        }]
				    });
			},
			platformTransactCount: function(){

				  var $platformTransactTotal = $('#platformTransactCount');
				  var data = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6];

				  $platformTransactTotal.highcharts({
				        title: {
					        text: '每月交易笔数（笔）',
					        x: -20
					    },
					    legend: {
				        	enabled: false
				        },
					    subtitle: {
					        text: '',
					        x: -20
					    },
					    xAxis: {
					        categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
					    },
					    credits: {
				        	enabled: false
				        },
					    yAxis: {
					        title: {
					            text: ''
					        },
					        tickAmount: 6,
					        className: 'y-sl'
					    },
					    plotOptions: {
				            line: {
				                dataLabels: {				                	
					                enabled: true,
					                borderRadius: 8,
					                backgroundColor: 'rgba(104, 123, 255, 0.6)',
					                y: -10,
				                    style: {
				                    	color: '#fff',
				                    	fontSize: '14px',
				                    	fontWeight: 'normal',
				                    	textOutline: 'none'
				                    }

				                },
				                color: '#687bff',
				                enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
				            }
				        },
					    tooltip: {
					    	headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
				            footerFormat: '</table>',
				            shared: false,
				            useHTML: false,
				            enabled: false

					    },
					    series: [{
					        data: data
					    }]
				    });
			},
			financingEnterprisetTotal: function(){

				  var $financingEnterprisetTotal = $('#financingEnterprisetTotal');
				  var data = [49.9, 20000, 5666.4, 0, 0, 0, 0, 0, 0, 0, 0, 0];

				  $financingEnterprisetTotal.highcharts({
				        chart: {
				            type: 'column'
				        },
				        title: {
				            text: '每月借款总额（万元）'
				        },	
				        legend: {
				        	enabled: false
				        },	
				        credits: {
				        	enabled: false
				        },		   
				        xAxis: {
				            categories: [
				                '一月',
				                '二月',
				                '三月',
				                '四月',
				                '五月',
				                '六月',
				                '七月',
				                '八月',
				                '九月',
				                '十月',
				                '十一月',
				                '十二月'
				            ],
				            crosshair: true
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: ''
				            },
				            tickAmount: 6,
				            className: 'y-sl'
				        },
				        plotOptions: {
				            series: {
				                borderWidth: 0,
				                dataLabels: {
				                    enabled: true,
				                    format: '{point.y}',
				                    style: {
				                    	color: '#404040',
				                    	fontSize: '14px',
				                    	fontWeight: 'normal',
				                    	textOutline: 'none'
				                    }
				                }
				            }
				        },
				        colors: ['#ff6460'],
				        tooltip: {
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
				            footerFormat: '</table>',
				            shared: false,
				            useHTML: false,
				            enabled: false
				        },				       
				        series: [{				            
				            data: data
				        }]
				    });
			},
			financingEnterpriseCount: function(){

				  var $financingEnterpriseCount = $('#financingEnterpriseCount');
				  var data = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6];

				  $financingEnterpriseCount.highcharts({
				        title: {
					        text: '每月借款笔数（笔）',
					        x: -20
					    },
					    legend: {
				        	enabled: false
				        },
					    subtitle: {
					        text: '',
					        x: -20
					    },
					    credits: {
				        	enabled: false
				        },
					    xAxis: {
					        categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
					    },
					    yAxis: {
					        title: {
					            text: ''
					        },
					        tickAmount: 6,
					        className: 'y-sl'
					    },
					    plotOptions: {
				            line: {
				                dataLabels: {				                	
					                enabled: true,
					                borderRadius: 8,
					                backgroundColor: 'rgba(104, 123, 255, 0.6)',
					                y: -10,
				                    style: {
				                    	color: '#fff',
				                    	fontSize: '14px',
				                    	fontWeight: 'normal',
				                    	textOutline: 'none'
				                    }

				                },
				                color: '#687bff',
				                enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
				            }
				        },
					    tooltip: {
					    	headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
				            footerFormat: '</table>',
				            shared: false,
				            useHTML: false,
				            enabled: false

					    },
					    series: [{
					        name: '1',
					        data: data
					    }]
				    });
			},
			investorAge: function(){

				var $investorAge = $('#investorAge');

			    var data = [
			    	{ name : '60后', y: 87.8},
			    	{ name : '70后', y: 2.8},
			    	{ name : '80后', y: 36.8},
			    	{ name : '90后', y: 56.8},
			    	{ name : '其他', y: 16.8}
			    ];			    

				$investorAge.highcharts({
				    chart: {
			            plotBackgroundColor: '#fff',
			            plotBorderWidth: null,
			            plotShadow: null,
			            spacing : [40, 0 , 0, 0],
			            height: 430
			        },
			        title: {
			            floating:true,
				        text: '按年龄分布'
			        },
			        credits: {
			        	enabled: false
			        },
			        tooltip: {
			        	useHTML: true,
			        	headerFormat: '',
					    pointFormat: '<div>{point.name}: {point.percentage:.1f}%</div>'
			        },
			        legend: {
			            align: 'right',
			            verticalAlign: 'middle',
			            width: 60,
			            itemMarginBottom: 28,
			            x: -50
			        },
			        plotOptions: {
			        	pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    format: '{point.percentage:.1f} %',
			                    style: {
			                        color: '#fff',
			                        fontSize: '16px',
			                        textOutline: 'none',
			                        fontWeight: 'normal'
			                    },
			                     backgroundColor: '#43464d',
			                     borderRadius: 20,
			                     padding: 6,
			                     distance: 0
			                },				               
			                showInLegend: true
			            }				           
			        },
			        colors: ['#a66aff', '#6a7dff', '#ff6460', '#ffe88a', '#ff8a6a'],
			        series: [{
				            type: 'pie',
				            innerSize: ['80%'],
				            data: data
				        }]
			    }, function(c) {
			        // 环形图圆心
			        var centerY = c.series[0].center[1],
			            titleHeight = parseInt(c.title.styles.fontSize);
			        
			        c.setTitle({
			            y:centerY + titleHeight/2,
			            x: -65
			        });
			        chart = c;
			    });
			},
			investorTotal: function(){

				var $investorTotal = $('#investorTotal');

				 var data = [
			    	{ name : '1万元以下', y: 87.8},
			    	{ name : '1-5万', y: 2.8},
			    	{ name : '5-10万', y: 36.8},
			    	{ name : '10-20万', y: 56.8},
			    	{ name : '20-50万', y: 16.8},
			    	{ name : '50万以上', y: 16.8}
			    ];
				
				$investorTotal.highcharts({
				        chart: {
				            plotBackgroundColor: '#fff',
				            plotBorderWidth: null,
				            plotShadow: null,
				            spacing : [40, 0 , 0, 0],
				            height: 430
				        },
				        credits: {
				        	enabled: false
				        },
				        title: {
				            floating:true,
				            text: '按投资额分布'
				        },
				        tooltip: {
				        	useHTML: true,
				        	headerFormat: '',
						    pointFormat: '<div>{point.name}: {point.percentage:.1f}%</div>'
				        },
				        legend: {
				            align: 'right',
				            verticalAlign: 'middle',
				            width: 100,
				            itemMarginBottom: 28,
				            x: -10
				        },
				        plotOptions: {
				        	pie: {
				        		allowPointSelect: true,
				                cursor: 'pointer',
				                dataLabels: {
				                    enabled: true,
				                    format: '{point.percentage:.1f} %',
				                    style: {
				                        color: '#fff',
				                        fontSize: '16px',
				                        textOutline: 'none',
				                        fontWeight: 'normal'
				                    },
				                     backgroundColor: '#43464d',
				                     borderRadius: 20,
				                     padding: 6,
				                     distance: 0
				                },				               
				                showInLegend: true
				            }				           
				        },
				        colors: ['#ff6460', '#6a7dff', '#ffe88a', '#a66aff', '#ff8a6a', '#4b4b4b'],
				        series: [{
				            type: 'pie',
				            innerSize: '80%',
				            name: null,
				            data: data
				        }]
				    }, function(c) {
				        // 环形图圆心
				        var centerY = c.series[0].center[1];
				        var titleHeight = parseInt(c.title.styles.fontSize);

				        c.setTitle({
				            y:centerY + titleHeight/2,
				            x: -70
				        });
				        chart = c;
				    });
			},
			areaMap: function(){

					// 获取中国地图数据并初始化图表
					$.getJSON('/views/disclosure/platformData/js/mapData.json', function(mapdata) {
					    // var data = [];
					    // // 随机数据
					    // Highcharts.each(mapdata.features, function(md, index) {
					    	
					    //     data.push({
					    //         name: md.properties.name,
					    //         value: Math.floor((Math.random() * 100) + 1)/100 // 生成 1 ~ 100 随机值
					    //     });					       
					    // });
					    // data.shift();//删除台湾的数据

					    new Highcharts.Map('areaMapRight', {
					        chart: {					        	
					        	height: 610
					        },
					        title: {
					            text: ''
					        },
					        legend:{
					        	enabled: false
					        },
					        subtitle: {
					            text: ''
					        },
					        mapNavigation: {
					            enabled: false,
					            buttonOptions: {
					                verticalAlign: 'bottom'
					            }
					        },
					        tooltip: {
					            useHTML: true,
					            headerFormat: '<div>{point.name}{point.value}</div>',
					            valueSuffix: '%'
					        },
					        colorAxis: {
					            min: 0,
					            minColor: '#dde0e7',
					            maxColor: '#767d8d',
					            labels:{
					                style:{
					                    "color":"red","fontWeight":"bold"
					                }
					            }
					        },
					        series: [{
					            data: t.testData,
					            mapData: mapdata,
					            joinBy: 'name',
					            name: '',
					            states: {
					                hover: {
					                    color: '#a4edba'
					                }
					            },
					            dataLabels: {
				                    enabled: true,				                    
				                    format: '{point.name}',
				                    style: {
				                    	color: 'white',
				                    	fontWeight: 'normal'
				                    }
				                }
					        }]
					    });

					    setTimeout(function(){
					    	//$('#areaMapRight').find('text').remove()
					    }, 10)
					});	

			},
			operationBanner: function(){

				var $carouselCon = $('.carousel-con');
				var $li = $carouselCon.find('li');
				var $left = $carouselCon.find('.move-left');
				var $right = $carouselCon.find('.move-right');
				var $carouselNav = $carouselCon.find('.carousel-nav');
				var $carouselSpan = $carouselNav.find('span');
				$carouselNav.css({left : ($carouselCon.width()/2 - $carouselNav.width()/2)});

				var index = 0;
				var maxLen = $carouselSpan.length;

				$left.on('click', function(){

					if( --index < 0){
						index = maxLen - 1;
					}
					$carouselSpan.removeClass('cur');
					$carouselSpan.eq(index).addClass('cur');

					$li.stop(true, true).fadeOut(800);
					$li.eq(index).stop(true, true).fadeIn(1000);
				});

				$right.on('click', function(){

					if( ++index >= maxLen){
						index = 0;
					}
					$carouselSpan.removeClass('cur');
					$carouselSpan.eq(index).addClass('cur');

					$li.stop(true, true).fadeOut(800);
					$li.eq(index).stop(true, true).fadeIn(1000);
				});

				var timeId;

				autoInterval();

				$carouselCon
				.on('mouseenter', function(){
					clearInterval(timeId);
				})
				.on('mouseleave', function(){
					autoInterval();
				});

				function autoInterval(){

					timeId = setInterval(function(){
						if( ++index >= maxLen){
							index = 0;
						}

						$carouselSpan.removeClass('cur');
						$carouselSpan.eq(index).addClass('cur');

						$li.stop(true, true).fadeOut(800);
						$li.eq(index).stop(true, true).fadeIn(1000);
					}, 3000);
				}

			}
		}

		page.init();
	});

});