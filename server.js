var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.set('port', (process.env.PORT || 8000));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client')));
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');
require('./config/mongoose.js'); //requires picnic_list db
require("./config/routes.js")(app);

var server = app.listen(app.get('port'), function(){
  console.log("Node app is running on port", app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){

  socket.on('toast', function(name){
    io.emit('makeToast', name);
  })

})