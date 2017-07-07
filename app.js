var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var template=require('art-template');
var fs = require('fs'); 
var log4js = require('log4js');

var debug = require('debug')('app: app.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'statics/views'));

template.config('base','');
template.config('extname','.html');
template.config('encoding','utf-8');

app.engine('.html',template.__express);
app.set('view engine','html');
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(logger('dev'));

log4js.configure({
  appenders: [
    { type: 'console' }, //控制台输出
    {
      type: 'file', //文件输出
      filename: 'logs/access.log', 
      maxLogSize: 1024,
      backups:3,
      category: 'normal' 
    }
  ],
  replaceConsole: true
});

var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

app.use(log4js.connectLogger(logger, {level:'auto', format:':method :url'}));

app.use(compression()); // 开启 gzip 压缩
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/statics')));

//var accessLog = fs.createWriteStream('./access.log', {flags : 'a'});  
//app.use(logger('combined', {stream : accessLog})); 

//var index = require('./routes/disclosure/platformData/index');
//app.use('/', index);

var routes = require('./routes/index');
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// 获取本地 以太网 IPv4 的 ip 地址
function getIp(){
    let os = require('os');
    let ifaces = os.networkInterfaces();
    for (let dev in ifaces) {  
      if('以太网' == dev){
        for(let i = 0, len = ifaces[dev].length; i < len; i++){
          if (ifaces[dev][i].family == 'IPv4') {
            return ifaces[dev][i].address;
          }  
        }
      }
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */


function onListening() {

  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  debug('Server running at http://' + getIp() + ':' + port +'/');
}


exports.logger=function(name){
  var logger = log4js.getLogger(name);
  logger.setLevel('INFO');
  return logger;
}
