const health = require("./health");
const auth = require("./auth");
const user = require("./user");
const course = require("./course");
const wishlist = require("./wishlist");

module.exports = (app) => {
  app.use("/health", health);
  app.use("/auth", auth);
  app.use("/users", user);
  app.use("/courses", course);
  app.use("/wishlist", wishlist);
};
