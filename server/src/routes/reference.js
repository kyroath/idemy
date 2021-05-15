const express = require("express");
const db = require("../db");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.get("/:id", authenticate("user"), async (req, res) => {
  // check if reference already exists
  const check = await db.query(
    "SELECT reference_code FROM course_reference WHERE user_id = $1 AND course_id = $2",
    [req.user.user_id, req.params.id]
  );
  if (check.rowCount > 0) {
    return res.send(check.rows[0]);
  }

  const db_res = await db.query(
    "INSERT INTO reference_code (user_id, course_id) VALUES ($1, $2) RETURNING reference_code"
  );
  res.send(db_res.rows[0]);
});

module.exports = router;
