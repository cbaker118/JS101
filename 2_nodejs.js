//quick utility
var fs = require('fs');

//send off a request to load a file to memory, call function when loaded
fs.readFile('js101.txt','utf-8',function(err,data){
	var lines = data.split("\n");
	console.log('file has '+lines.length+' number of lines.');
});
console.log('executing code after readFile');




//basic nodejs http server
var http = require("http");

//create http server object
//every time any http request comes to nodejs (port 8081) run the supplied function
http.createServer(function (request, response) {

	// Send the HTTP header 
	// HTTP Status: 200 : OK
	// Content Type: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// Send the response body as "Hello World"
	response.end('Hello World\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');




//basic nodejs expressjs server
var express = require('express');
var app = express();
app.get('/', function (req, res) {
	res.send('Hello World!');
});
app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});