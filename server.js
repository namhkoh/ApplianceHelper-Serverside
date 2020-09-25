var express = require('express'); 
var app = express(); 
 
const bodyParser = require('body-parser'); 
// var server = app.listen(3000); 
 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
 
app.post('/postdata', (req, res) => { 
    var data = req.body.data; // your data 
    console.log(data)
    // do something with that data (write to a DB, for instance) 
	res.status(200).json({ 
		message: "Data received successfully" 
	}); 
}); 

app.get('/postdata',function(req,res){
    res.send('Hello World');
});

app.listen(3000, function (req,res){
    console.log('Running...');
});