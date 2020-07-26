const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

const APIRoutes = require("./api");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/", APIRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Protracker backend server is up and running...");
});

app.get("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

app.post("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

app.put("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

app.delete("*", (req, res) => {
  res
    .status(404)
    .send("OOPS something is wrong. We do not have the page requested.");
});

const server = http.createServer(app);
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server is running at PORT ${port}`);
});
