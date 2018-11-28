// Inital Variables \\
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var exec = require('child_process').exec;

// EXPRESS SERVER \\
// Point to website directory
app.use(express.static(__dirname + '/public'));
// Host web server
var port = 8080
http.listen(port,function(){
  console.log('Server Initiated' );
});

// SOCKET.IO \\
var clients = [];
io.on('connection', function(socket){

    // Update user count //
    clients.push(socket.id);
    console.log('A user has connected');
    if(clients.length == null)
      console.log("Current Users: 0");
    else
      console.log("Current Users: " + clients.length);
    io.emit('clients connected', clients.length);// update client's user count

    // On Disconnection //
    socket.on('disconnect', function(){
      // Update user count
      for(var i = 0; i < clients.length; i++){
        if(clients[i] == socket.id){
          clients.splice(i,1);
        }
      }
      console.log('A user has disconnected');
      if(clients.length == null)
        console.log("Current Users: 0");
      else
        console.log("Current Users: " + clients.length);
      io.emit('clients connected', clients.length);// update client's user count
    });

    // On TV Remote Input //
    socket.on('remoteCommand', function(button){
      // Create command
      console.log(button + " was pressed")
      var command = "python " + __dirname+"/tv_commands/ir_remote.py -p -g13 -f " + __dirname+"/tv_commands/codes.json " + button;
      console.log(command);
      // Execute command
      exec(command, function(error, stdout, stderr) {});
    });
});
