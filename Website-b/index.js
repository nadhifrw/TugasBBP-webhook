const express = require("express");
const app = express();

var bodyParser = require("body-parser");
var cors = require("cors");

var jsonParser = bodyParser.json();

var urlencodeParser = bodyParser.urlencoded({ extended: false });

const port = 3001;

app.use(cors());
app.use(jsonParser);
app.use(urlencodeParser);

app.get("/", async (req, res) => {
  const response = await fetch("http://localhost:3000/");
  const body = await response.text();

  console.log(body);
  res.json("Website B");
});

app.get("/trigger-webhook-event", async (req, res) => {
  try {
    const data = {
      secret: "rahasia1234",
    };

    const response = await fetch("http://localhost:3000/github-event", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    // Handle the response if needed
    const responseDataSent = await response.json();
    console.log(responseDataSent);

    res.json("Webhook success!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
