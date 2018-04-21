var express   = require('express');
var router          = express.Router();
var path   = require('path');
var http    = require('http');
var fs     = require('fs');
var app = express();

var port = 8080;

function getUserIP(req){
    var ipAddress;

    if(!!req.hasOwnProperty('sessionID')){
        ipAddress = req.headers['x-forwarded-for'];
    } else{
        if(!ipAddress){
            var forwardedIpsStr = req.header('x-forwarded-for');

            if(forwardedIpsStr){
                var forwardedIps = forwardedIpsStr.split(',');
                ipAddress = forwardedIps[0];
            }
            if(!ipAddress){
                ipAddress = req.connection.remoteAddress;
            }
        }
    }
    return ipAddress;
}
/**
 * Return a timestamp with the format "m/d/yy h:MM:ss TT"
 * @type {Date}
 */

function timeStamp() {
// Create a date object with the current time
  var now = new Date();

// Create an array with the current month, day and time
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// Determine AM or PM suffix based on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

// Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

// If hour is 0, set it to 12
  time[0] = time[0] || 12;

// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }

// Return the formatted string
  return date.join("/") + " " + time.join(":") + " " + suffix;
}

app.get('/',function(req,res){
	
	fs.appendFile('../log.txt', "["+timeStamp()+"]["+getUserIP(req)+"]"+' Server get / \n', function (err) {
	  if (err) throw err;
	});
	
	
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
	
	fs.appendFile('../log.txt', "["+timeStamp()+"]["+getUserIP(req)+"] - "+__dirname+ req.url+"\n", function (err) {
	  if (err) throw err;
	});
 res.sendfile(__dirname+ req.url,function(err){
  res.end();
 });
});

app.listen(port, function () {
  console.log('Server is running. Point your browser to: http://localhost:'+port);
});


process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});