const http = require('http');
const qs = require('querystring');

function getAction(gameName){
  if(gameName === "reversi"){
    var reversi = require('./reversi.js');
    return new reversi.Action();
  }
}

http.createServer((req, res) => {
  if(req.url !== "/"){
    res.end();
    return
  }
  if(req.method === "GET"){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Please Use POST method\n");
  }else if(req.method === "POST"){
    //body parse
    var body = '';
    req.on('data', (data) => {
      body += data;
      if(body.length > 1e6) {
        req.connection.destory();
      }
    });

    req.on('end', () => {
      //create action
      var input = qs.parse(body);

      //handle
      var action = getAction(input.gameName);
      var context =
      var store
      handler(action, context, store)

      //make response
      var response
      res.end(response);
    });
  }
}).listen(8080);
