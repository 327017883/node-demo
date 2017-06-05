let http = require('http');
let debug = require('debug');
let httpDebug = debug('app:http');
let errorDebug = debug('app:error');
let clientwebsocket = debug('app:clientwebsocket');
let serverwebsocket = debug('app:serverwebsocket');
let eventproxy = require('eventproxy');

let host = require('../config/config.js');

var websocket = require('websocket')


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

		ep.all('optionsDataAummary', 'optionsDataOperate', function(data1, data2){
			console.log('并发请求结束：')
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

		WebSocketServerFn();

		function WebSocketServerFn(){

			var WebSocketServer = require('websocket').server;

			var server = http.createServer(function(request, response) {
			    serverwebsocket((new Date()) + ' Received request for ' + request.url);
			    response.writeHead(404);
			    response.end();
			});
			server.listen(8080, function() {
			    serverwebsocket((new Date()) + ' Server is listening on port 8080');
			});

			wsServer = new WebSocketServer({
			    httpServer: server,
			    // You should not use autoAcceptConnections for production
			    // applications, as it defeats all standard cross-origin protection
			    // facilities built into the protocol and the browser.  You should
			    // *always* verify the connection's origin and decide whether or not
			    // to accept it.
			    autoAcceptConnections: false
			});

			function originIsAllowed(origin) {
			  // put logic here to detect whether the specified origin is allowed.
			  return true;
			}

			wsServer.on('request', function(request) {

			    if (!originIsAllowed(request.origin)) {
			      // Make sure we only accept requests from an allowed origin
			      request.reject();
			      serverwebsocket((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
			      return;
			    }
			    
			    var connection = request.accept('echo-protocol', request.origin);
			    serverwebsocket((new Date()) + ' Connection accepted.');

			    connection.on('message', function(message) {
			        if (message.type === 'utf8') {
			            serverwebsocket('Received Message: ' + message.utf8Data);
			            connection.sendUTF(message.utf8Data);
			        }
			        else if (message.type === 'binary') {
			            serverwebsocket('Received Binary Message of ' + message.binaryData.length + ' bytes');
			            connection.sendBytes(message.binaryData);
			        }
			    });
			    connection.on('close', function(reasonCode, description) {
			        serverwebsocket((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
			    });
			});
		}		

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