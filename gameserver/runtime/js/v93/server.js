const express = require('express')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.listen(8080);
console.log("Server is running.")

function getAction(gameName){
  if(gameName === "reversi"){
    var reversi = require('./reversi.js');
    return new reversi.Action();
  }
}

app.get('/', function(req, res){
    res.send("Please Use POST method\n");
});

app.post('/', function(req, res){
  var body = req.body
  //handle
  var action = getAction(body.gameName);
  var context = body.context
  var store = body.store

  var bot = require("./bot.js")
  bot.handler(action, context, store)

  //make response
  res.send({action, store});
});
