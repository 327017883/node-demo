let http = require('http');
let debug = require('debug');
let httpDebug = debug('app:http');
let errorDebug = debug('app:error');
let eventproxy = require('eventproxy');

let host = require('../config/config.js');

module.exports = function(app){

	let pages = {

		//首页
		index : {
			getUrl: '/',
			renderUrl: 'disclosure/platformData/index',
			title: '平台数据'
		},

		//关于民投
		about: {
			getUrl: '/about',
			renderUrl: 'disclosure/about/about',
			title: '关于民投',

			//股东背景
			shareholder: {
				getUrl: '/about/shareholder',
				renderUrl: 'disclosure/about/shareholder',
				title: '股东背景'
			},

			//高管团队
			team: {
				getUrl: '/about/team',
				renderUrl: 'disclosure/about/team',
				title: '高管团队'
			},

			//资质荣誉
			honors: {
				getUrl: '/about/honors',
				renderUrl: 'disclosure/about/honors',
				title: '资质荣誉'
			},

			// 联系我们
			contact: {
				getUrl: '/about/contact',
				renderUrl: 'disclosure/about/contact',
				title: '联系我们'
			}
		},

		//公司动态 媒体报道列表页
		news: {
			getUrl: '/news/noticeList',
			renderUrl: 'disclosure/news/noticeList',
			title: '媒体报道列表页',
			
			//媒体报道详情
			noticeDetail: {
				getUrl: '/news/noticeDetail',
				renderUrl: 'disclosure/news/noticeDetail',
				title: '媒体报道详情页'
			},

			//平台公告列表页
			reportList: {
				getUrl: '/news/reportList',
				renderUrl: 'disclosure/news/reportList',
				title: '平台公告列表页'
			},

			//平台公告详情页
			reportDetail: {
				getUrl: '/news/reportDetail',
				renderUrl: 'disclosure/news/reportDetail',
				title: '平台公告详情页'
			}
		},

		//监管部门
		supervise: {
			getUrl: '/supervise/supervise',
			renderUrl: 'disclosure/supervise/supervise',
			title: '监管部门',

			//法律法规
			laws: {				
				getUrl: '/supervise/laws',
				renderUrl: 'disclosure/supervise/laws',
				title: '法律法规'
			}			
		}
	};

	app.get( pages.index.getUrl, (req,response) =>{

		httpDebug('============= 平台数据 ================');
		
		let ep = new eventproxy();
		let returnData = {
			title: '平台数据'
		};		

		//请求参数
		var requestOptions = {
			optionsDataAummary: {
				hostname: host.hostname,
				port: host.port,
			    path: '/views/disclosure/platformData/js/dataAummary.json'
			},
			optionsDataOperate: {
				hostname: host.hostname,
				port: host.port,
			    path: '/views/disclosure/platformData/js/dataOperate.json'
			}
		};

		getData(requestOptions.optionsDataAummary, function(data){
			ep.emit('optionsDataAummary', data);
		});

		getData(requestOptions.optionsDataOperate, function(data){
			ep.emit('optionsDataOperate', data);
		});

		function getData(options, fn){
			let req1 =
				http.request(options, (res) =>{ 

					res.setEncoding('utf8');
				    res.on('data', (data) => {
				    	fn(data);
				    });
				    res.on('end', () => {
				    	//httpDebug('响应中已无数据');
				    });

				})
				.on('error', (e) => {			
				    //errorDebug('problem with request: ' + e.message);		    
				})
				.on('finish', () => {
					//httpDebug('请求完成');
				});	  
				req1.end();
		}

		ep.all('optionsDataAummary', 'optionsDataOperate', function(data1, data2){
			console.log('并发请求结束：')
			returnData.dataAummary = JSON.parse(data1);
			returnData.dataOperate = JSON.parse(data2);
			response.render( pages.index.renderUrl, returnData);  
		});

	});

	app.get( pages.about.getUrl, function(req,res){  
		res.render( pages.about.renderUrl, { title: '关于民投' });  
	});

	app.get( pages.about.shareholder.getUrl, function(req,res){  
		res.render( pages.about.shareholder.renderUrl, { title: '股东背景' });  
	});

	app.get( pages.about.team.getUrl, function(req,res){  
		res.render( pages.about.team.renderUrl, { title: '高管团队' });  
	});

	app.get( pages.about.honors.getUrl, function(req,res){  
		res.render( pages.about.honors.renderUrl, { title: '资质荣誉', staticRoot: '/views/disclosure/about/img' });  
	});

	app.get( pages.about.contact.getUrl, function(req,res){  
		res.render( pages.about.contact.renderUrl, { title: '联系我们', staticRoot: '/views/disclosure/about/img'  });  
	});

	app.get( pages.news.getUrl, function(req,res){  
		res.render( pages.news.renderUrl, { title: '媒体报道列表页' });  
	});

	app.get( pages.news.noticeDetail.getUrl, function(req,res){  
		res.render( pages.news.noticeDetail.renderUrl, { title: '媒体报道详情' });  
	});

	app.get( pages.news.reportList.getUrl, function(req,res){  
		res.render( pages.news.reportList.renderUrl, { title: '平台公告列表页', staticRoot: '/views/disclosure/news/img'  });
	});

	app.get( pages.supervise.getUrl, function(req,res){  
		res.render( pages.supervise.renderUrl, { title: '监管部门' });  
	});

	app.get( pages.supervise.laws.getUrl, function(req,res){  
		res.render( pages.supervise.laws.renderUrl, { title: '法律法规' });  
	});
	
};  