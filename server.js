var express = require("express")
var db = require("../ApplianceHelper-Serverside/db/data")
// Set up the express app
const app = express();
// get all todos
app.get('/api/v1/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'userData retrieved successfully',
    userData: db
  })
});
const PORT = 3030;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});