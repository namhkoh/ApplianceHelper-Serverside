var express = require("express");
var app = express();

const bodyParser = require("body-parser");
// var server = app.listen(3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/postdata", (req, res) => {
  var data = req.body.data; // your data
  console.log(data);
  // do something with that data (write to a DB, for instance)
  res.status(200).json({
    message: "Data received successfully",
  });
});

app.get("/postdata", function (req, res) {
  // res.send('Appliance Helper test');
  req.addListener("data", function (chunk) {
    data += chunk;
  });
  req.addListener("end", function () {
    console.log("from android :" + data);
  });
});

app.listen(3030, function (req, res) {
  console.log("Running...");
});
