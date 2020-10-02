var express = require("express");
var app = express();
var myParser = require("body-parser");

app.use(myParser.urlencoded({ extended: true }));
app.post("/sendData", function (request, response) {
  console.log(request.User); 
});

app.get("/getData", function (req, res) {
  // res.send('Appliance Helper test');
  var data = req.User; // your data
  req.addListener("User", function () {
    console.log("from android :" + data);
  });
});

app.listen(3030, function (req, res) {
  console.log("Running...");
});
