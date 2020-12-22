const express = require("express");
const bodyParser = require('body-parser');
const markdownIt = require('markdown-it');
const md = new markdownIt({
  html:true,
  breaks:true,
  linkify:false,
  typographer:true
});

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use((req, res, next)=> {
  console.log(req.originalUrl);
  next();
})

app.get('/', function(req, res){
  res.send('Hello World!');
});

app.post("/convert", function(req, res, next) {
  console.log('converting');
  if(typeof req.body == 'undefined' || req.body == null) {
    res.json(["error", "No data found"]);
  } else {

    res.send(md.render(req.body));
  }
});

app.listen(3000, "0.0.0.0", function() {
 console.log("Server running on port 3000");
});
