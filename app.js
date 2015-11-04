#!/usr/bin/env node

var os = require('os');
var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');

var _build = serveStatic('build');
var _static = serveStatic('static');
var _external = serveStatic('external');
var _lib = serveStatic('lib');
// var _css = serveStatic('node_modules/cinetv-layout/lib');


var app = connect();
var compression = require('compression');

app.use(compression());

// app.use(function(req, res, next){
//   next();
// });

// app.use(_css);
app.use(_static);
app.use(_external);
app.use(_lib);

var port = 8888;

var server =http.createServer(app).listen(port, function() {
  console.log("=======================================");
  console.log("Listening on http://" + os.hostname() + ":" + port + "/");
  console.log("=======================================");
});


var io = require('socket.io').listen(server);
// TODO socket 1.3.5 var io = require('socket.io')(server);



var t;


function rnd(m) {
    var num=Math.floor(Math.random()*m);
    return num;
}

io.sockets.on('connection', function(socket) {
  t=setInterval( function() {
      socket.broadcast.emit('game', 
        {
          score:rnd(10000),
          lives:rnd(10),
          coin:rnd(100),
          time:rnd(100),
          enemies:[{x:rnd(10), y:rnd(10)}],
          weapons:rnd(100),
        }
      );
  }, 1200);

  socket.on('subscribe', function(data) {

  });

  socket.on('message', function(data) {
    socket.broadcast.emit('message', data);
  });
});