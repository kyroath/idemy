const Router = require("express-promise-router");

const router = new Router();

router.get("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
