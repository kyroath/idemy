const health = require("./health");
const auth = require("./auth");

module.exports = (app) => {
  app.use("/health", health);
  app.use("/auth", auth);
};
