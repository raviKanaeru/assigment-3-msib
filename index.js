const express = require("express");
const app = express();
const routes = require("./routers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Ini home");
});

module.exports = app;
