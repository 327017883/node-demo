
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);
app.post('/', function(req, res){
  res.send(req.body);
});

app.get('/about', function(req, res) {
	res.render('about.jade', { title : 'about'});
});


app.get('/users/:id', function (req, res) {
	res.send('show content for user id' + req.params.id)
});




var server = app.listen(3800);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
