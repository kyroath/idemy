const express = require("express");
const morgan = require("morgan");

const app = express();

// enable middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan());
}

// mount routers
require("./routes")(app);

module.exports = app;
