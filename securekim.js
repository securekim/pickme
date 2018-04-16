var express   = require('express');
var router          = express.Router();
var path   = require('path');
var http    = require('http');
var fs     = require('fs');
var app = express();

var port = 80;

app.get('/',function(req,res){
	
	console.log('Server get / ');
    fs.readFile('./main/main.html', function(error, data) {
          if(error != undefined) {
              res.writeHead(404);
              res.end();
          } else {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.end(data);
          }
      });
  });

app.get('/*', function(req, res) { 
//�ٸ� ��θ� ��û������, ���� �� ��ο� �ִ� ������ �����մϴ�.
 
  console.log(__dirname+ req.url);
 res.sendfile(__dirname+ req.url,function(err){
  console.log(err);
  res.end();
 });
});

app.listen(port, function () {
  console.log('Server is running. Point your browser to: http://localhost:'+port);
});


process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});