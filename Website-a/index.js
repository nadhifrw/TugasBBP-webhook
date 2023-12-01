const express = require("express");
const app = express();

var bodyParser = require("body-parser");
var cors = require("cors");

var jsonParser = bodyParser.json();

var urlencodeParser = bodyParser.urlencoded({ extended: false });

const port = 3000;

app.use(cors());
app.use(jsonParser);
app.use(urlencodeParser);

app.get("/", (req, res) => {
  res.json("Website A");
});

app.post("/github-event", (req, res) => {
  if (req.body.secret !== "rahasia1234") {
    return res.status(403).json({ error: "Invalid secret" });
  }

  console.log("Incoming Webhook");
  res.json("");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
