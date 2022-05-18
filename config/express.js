const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../api/routes");
const requestLogger = require("../api/middlewares/requestLogger");

/**
 * Express instance
 */
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource sharing
app.use(cors());

// log request data
app.use(requestLogger);

// routes....
app.use("/", routes);

module.exports = app;
