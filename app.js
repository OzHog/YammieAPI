const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./api/routes/yammieRoutes");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app); //add routes to app

module.exports = app;
