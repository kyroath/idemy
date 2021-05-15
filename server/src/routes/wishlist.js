const express = require("express");
const db = require("../db");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.get("/", authenticate("user"), async (req, res) => {
  // get wishlist
  const db_res = await db.query(
    "SELECT * FROM wishlist_courses WHERE user_id = $1",
    [req.user.user_id]
  );

  res.send(db_res.rows);
});

router.get("/:id", authenticate("admin"), async (req, res) => {
  const db_res = await db.query(
    "SELECT * FROM wishlist_courses WHERE user_id = $1",
    [req.params.id]
  );

  res.send(db_res.rows);
});

router.delete("/", authenticate("user"), async (req, res) => {
  await db.query("DELETE FROM wishlist WHERE user_id = $1", [req.user.user_id]);

  res.sendStatus(204);
});

router.delete("/:id", authenticate("user"), async (req, res) => {
  await db.query("DELETE FROM wishlist WHERE user_id = $1", [req.user.user_id]);
  const db_res = await db.query(
    "SELECT * FROM wishlist_courses WHERE user_id = $1",
    [req.user.user_id]
  );

  res.send(db_res.rows);
});

module.exports = router;
