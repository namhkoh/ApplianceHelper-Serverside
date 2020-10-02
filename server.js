var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(myParser.urlencoded({ extended: true }));
app.post("/sendData", function (request, response) {
  console.log(request.User); 
});

app.listen(3030);
