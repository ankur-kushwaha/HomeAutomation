  var socket = require('socket.io-client')('https://nodejs-ankurkushwaha.c9.io/');
  var readline = require('readline');
  
  var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

  socket.on('connect', function(){
	  socket.emit('chat message', "desktop client connected");
	  console.log("connected")
  });
  socket.on('chat message', function(data){
	  console.log(data)
	  
  });
  socket.on('disconnect', function(){
	  console.log("disconnected")
  });

rl.on("line",function(answer) {
  socket.emit('chat message', answer);
});
