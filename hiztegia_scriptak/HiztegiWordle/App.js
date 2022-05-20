const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

http.createServer(function (req, res) {

  if(req.url.indexOf('.html') != -1){ //req.url has the pathname, check if it conatins '.html'

    fs.readFile(__dirname + '/scriptProbatzeko.html', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });

  }

  if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'

    fs.readFile(__dirname + '/EstiloaProbatzeko.css', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });

  }
  if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.css'

    fs.readFile(__dirname + '/ScriptProbak.js', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });

  }

  if(req.url.indexOf('.json') != -1){ //req.url has the pathname, check if it conatins '.css'

    fs.readFile(__dirname + '/hiztegiJSON-EN.js', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/JSON'});
      res.write(data);
      res.end();
    });

  }

}).listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});