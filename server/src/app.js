const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// enable cors
app.use(cors());

// enable decoding
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

// add error handler
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = app;
