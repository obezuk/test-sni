process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
const HTTP_PORT = process.env.HTTPS_PORT || 3080;

const http = require('http');
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./certificate.pem')
};

https.createServer(options, (req, res) => {

  res.writeHead(200, { 'Content-Type': 'application/json' });

  var output = {
      "headers" : req.headers,
      "servername" : req.socket.servername || null
  };

  console.log("Recieved HTTPS request: " + JSON.stringify(output));

  res.end(JSON.stringify(output));

}).listen(HTTPS_PORT, function() {
    console.log('HTTPS server listening on port ' + HTTPS_PORT)
});

http.createServer(options, (req, res) => {

  res.writeHead(200, { 'Content-Type': 'application/json' });

  var output = {
      "headers" : req.headers
  };

  console.log("Recieved HTTP request: " + JSON.stringify(output));

  res.end(JSON.stringify(output));

}).listen(HTTP_PORT, function() {
    console.log('HTTP server listening on port ' + HTTP_PORT)
});