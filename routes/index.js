let http = require('http');
let debug = require('debug');
let httpDebug = debug('app:http');
let errorDebug = debug('app:error');
let epDebug = debug('app:ep');
let GeneratorDebug = debug('app:Generator');
let clientwebsocket = debug('app:clientwebsocket');
let serverwebsocket = debug('app:serverwebsocket');
let eventproxy = require('eventproxy');
let fs = require('fs');

let host = require('../config/config.js');

let movie = require('./movie');
let Product = require('../models/product.js');

module.exports = function(app){

	//接口

	//增删查改

	//增加数据
	app.post('/movie/add',movie.doMovieAdd);

	//查找数据
	app.post('/movie/query',movie.query);

	//删除数据
	app.post('/movie/del', movie.del);

	//更新数据
	app.post('/movie/update',movie.update);//JSON数据

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
		},
		//测试使用
		test:{
			getUrl:'/test',
			renderUrl:'test/test',
			title:'Mongoose',

			//分页测试
			pages: {
				getUrl: '/test/pages',
				renderUrl: 'test/pages',
				title: '分页测试'
			},
			toPage:{
				getUrl: '/test/pages/:page',
				renderUrl: 'test/pages',
				title: '分页测试'
			}
		}
	};

	app.get( pages.index.getUrl, (req,response) =>{

		//logger.info('============= 平台数据 ================');		
			
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

		testGenerator();
		//eventproxy 模块 控制并发请求
		function testEventproxy(){
			let ep = new eventproxy();
			let returnData = {
				title: '平台数据'
			};					

			getData(requestOptions.optionsDataAummary, function(data){
				ep.emit('optionsDataAummary', data);
			});

			getData(requestOptions.optionsDataOperate, function(data){
				ep.emit('optionsDataOperate', data);
			});

			ep.all('optionsDataAummary', 'optionsDataOperate', function(data1, data2){
				epDebug('并发请求结束')
				returnData.dataAummary = JSON.parse(data1);
				returnData.dataOperate = JSON.parse(data2);
				response.render( pages.index.renderUrl, returnData);  
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
		}

		// Generator 函数 测试多次请求，有先后顺序，即先执行一次异步请求，等待执行完后，再执行下一次异步操作
		function testGenerator(){

			function getDataPromise(options){

				return new Promise(function (resolve, reject){

				    let req1 =
					http.request(options, (res) =>{ 

						res.setEncoding('utf8');
					    res.on('data', (data) => {
					    	resolve(data);
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
				});				
			}

			function* Generator(){
				let returnValue = {
					title: '平台数据'
				};
				let optionsDataAummary = yield getDataPromise(requestOptions.optionsDataAummary);
				GeneratorDebug(optionsDataAummary);
				returnValue.dataAummary = JSON.parse(optionsDataAummary);

				let optionsDataOperate = yield getDataPromise(requestOptions.optionsDataOperate);
				GeneratorDebug(optionsDataOperate);
				returnValue.dataOperate = JSON.parse(optionsDataOperate);

				response.render( pages.index.renderUrl, returnValue); 
			}

			function run(gen){

			  var g = gen(); 

			  function next(data){
			    var result = g.next(data);
			    if (result.done) return result.value;
			    result.value.then(function(data){		    
			      next(data);
			    });
			  }
	 
			  next();
			}

			run(Generator);
	    }

	    //测试 websocket 协议
		//WebSocketServerFn();
		function WebSocketServerFn(){

			var server = require('http').createServer(app);
			var io = require('socket.io').listen(server);
			server.listen(8080, function(){
			    serverwebsocket((new Date()) + ' Server is listening on port 8080');
			});

			io.sockets.on('connection', function(socket) {

			    socket.on('message', function(data) {
			        serverwebsocket('Received message: ' + JSON.stringify(data));
			        socket.send({send: 'message'});
			    });

			    socket.on('disconnect',function(){ 
				    serverwebsocket('Server has disconnected'); 
				  });

			});
		}
			
	}); 

	app.get( pages.test.pages.getUrl, function(req,res){  

		//res.render( pages.test.pages.renderUrl, { title: pages.test.pages.title, staticRoot: '/views/test/'});
		res.redirect( 302, pages.test.pages.getUrl + '/1');
		
	});

	app.get( pages.test.toPage.getUrl, function(req,res){  

		var page = +req.params.page;
		
		if(page == 0){
			res.redirect( 302, pages.test.pages.getUrl + '/1');
			return;
		}

		var options = {
			page: page,
			size: 10,
			name: '',
			start: (page-1) * 10,
			end: (page-1) * 10 + 10
		}

		Product.findByName(options, function(err, obj){

			let totalPage = Math.ceil(obj.count/options.size);
			let arr = [];
			for(let i = 0; i < totalPage; i++){
				arr.push(i);
			}

			let result = {
				title: pages.test.toPage.title, 
				staticRoot: '/views/test/',
				page: options.page,
				totalPage: arr,
				movies: obj.data
			};
			//console.log(options)
			res.render( pages.test.toPage.renderUrl, result);
		});
		
	});

	app.get( pages.about.getUrl, function(req,res){  

		

		res.render( 'disclosure/about/aboutHead', { title: '关于民投' }, function(err, str){
			res.write(str);	
		});

		// bigPipe 应用

		//id 为 banner
		res.render( 'disclosure/about/aboutBanner', { curFocus: '关于民投' }, function(err, str){
			var str = str;
			str = str.replace(/(\r\n|\s{3,})/g,'');
			res.write("<script>replace('about', '"+ str +"')</script>");
			 		
		});

		//id 为 autoCon
		res.render( 'disclosure/about/aboutAutocon', { }, function(err, str){
			var str = str;
			str = str.replace(/(\r\n|\s{2,})/g,'');
			res.write("<script>replace('autoCon', '"+ str +"')</script>");
			res.write("</body></html>");
			res.end();
		});

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
	
	app.get( pages.test.getUrl, function(req,res){  
		res.render( pages.test.renderUrl, { title: pages.test.title, staticRoot: '/views/test/'});
	});

	
};  