var express = require("express");
// var db = require("../ApplianceHelper-Serverside/db/data");
var db = require('./db/data');
var bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { json } = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dirPath = path.join(__dirname, "/storedData");
const dir = "./storedData";
if (fs.existsSync(dir)) {
  console.log("Directory exits");
} else {
  fs.mkdirSync(dirPath);
}

app.get("/api/v1/getData", (req, res) => {
  // let rawDataOutput = fs.readFileSync('storedData/output.json');
  // let parsed = JSON.parse(rawDataOutput)
  res.status(200).send({
    success: "true",
    message: "userData retrieved successfully",
    userData: db,
  });
});
const PORT = 3030;

app.post("/api/v1/todos", (req, res) => {
  try {
    if (!req.body.testId) {
      return res.status(400).send({
        success: "false",
        message: "invalid testId",
      });
    } else if (!req.body.name) {
      return res.status(400).send({
        success: "false",
        message: "invalid name",
      });
    } else if (!req.body.startSession) {
      return res.status(400).send({
        success: "false",
        message: "invalid epoch time",
      });
    } else if (!req.body.endSession) {
      return res.status(400).send({
        success: "false",
        message: "invalid epoch time",
      });
    } else if (!req.body.totalTime) {
      return res.status(400).send({
        success: "false",
        message: "invalid epoch time",
      });
    } else if (!req.body.userConsent) {
      return res.status(400).send({
        success: "false",
        message: "invalid boolean",
      });
    } else if (!req.body.feedback) {
      return res.status(400).send({
        success: "false",
        message: "invalid score value",
      });
    } else if (!req.body.userSequence) {
      return res.status(400).send({
        success: "false",
        message: "invalid userSequence",
      });
    }
    const userData = {
      testId: req.body.testId,
      name: req.body.name,
      startSession: req.body.startSession,
      endSession: req.body.endSession,
      totalTime: req.body.totalTime,
      userConsent: req.body.userConsent,
      feedback: req.body.feedback,
      userSequence: req.body.userSequence,
    };
    console.log(userData);
    db.push(userData);
    fs.appendFile("storedData/output.json",JSON.stringify([userData]),
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
    return res.status(201).send({
      success: "true",
      message: "users added successfully",
      userData: userData,
    });
  } catch (e) {
    console.log("ERROR " + e);
  }
});

app.get("/api/v1/todos/:testId", (req, res) => {
  const testId = parseInt(req.params.testId, 1);
  db.map((userData) => {
    if (userData.testId === testId) {
      return res.status(200).send({
        success: "true",
        message: "userData retrieved successfully",
        userData,
      });
    }
  });
  return res.status(404).send({
    success: "false",
    message: "userData does not exist",
  });
});

app.delete("/api/v1/todos/:testId", (req, res) => {
  const testId = parseInt(req.params.testId, 10);
  db.map((userData, index) => {
    if (userData.testId === testId) {
      db.splice(index, 1);
      return res.status(200).send({
        success: "true",
        message: "testId deleted successfully",
      });
    }
  });
  return res.status(404).send({
    success: "false",
    message: "testId not found",
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

