const express = require("express");
const db = require("../db");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.get("/", authenticate("user"), async (req, res) => {
  const db_res = await db.query("SELECT * FROM enroll WHERE user_id = $1", [
    req.user.user_id,
  ]);

  res.send(db_res.rows);
});

router.post("/:id", authenticate("user"), async (req, res) => {
  // check course
  const check = await db.query(
    "SELECT NULL FROM courses WHERE course_id = $1",
    [req.params.id]
  );
  if (check.rowCount === 0) return res.sendStatus(400);

  await db.query(
    "INSERT INTO enroll (user_id, course_id, reference_code) VALUES ($1, $2, $3)",
    [req.user.user_id, req.params.id, req.body.reference_code]
  );

  res.sendStatus(200);
});

module.exports = router;
