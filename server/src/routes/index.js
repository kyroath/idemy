const health = require("./health");
const auth = require("./auth");
const user = require("./user");
const course = require("./course");
const wishlist = require("./wishlist");
const reference = require("./reference");
const enroll = require("./enroll");
const review = require("./review");
const lectures = require("./lectures");

module.exports = (app) => {
  app.use("/health", health);
  app.use("/auth", auth);
  app.use("/users", user);
  app.use("/courses", course);
  app.use("/wishlist", wishlist);
  app.use("/reference", reference);
  app.use("/enroll", enroll);
  app.use("/reviews", review);
  app.use("/lectures", review);
};
