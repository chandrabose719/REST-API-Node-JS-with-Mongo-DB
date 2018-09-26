var http = require('http');
var app = require('./app');

var port = process.env.PORT || 3333;

var server = http.createServer(app);
server.listen(port);
console.log('Server Running on '+ port);