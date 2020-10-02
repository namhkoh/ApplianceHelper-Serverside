// var express = require("express");
// var app = express();
// var myParser = require("body-parser");

// app.use(myParser.urlencoded({ extended: true }));
// app.post("/sendData", function (request, response) {
//   console.log(request.User); 
// });

// app.get("/sendData", function (req, res) {
//   // res.send('Appliance Helper test');
//   var data = req.User; // your data
//   req.addListener("User", function () {
//     console.log("from android :" + data);
//   });
// });

// app.listen(3030, function (req, res) {
//   console.log("Running...");
// });

var express = require('express'); 
var app = express(); 
  
const bodyParser = require('body-parser'); 
  
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
  
app.post('/postdata', (req, res) => { 
	var data = req.body.data; // your data 
	console.log(data); 
    // do something with that data (write to a DB, for instance) 
	res.status(200).json({ 
		message: "JSON Data received successfully" 
	}); 
}); 

app.listen(3030, function (req, res) {
  console.log("Running...");
});
