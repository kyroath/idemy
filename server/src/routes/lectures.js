const express = require("express");
const db = require("../db");

const { authenticate } = require("../utils/jwt");

const router = express.Router();

const checkOwns = async (user_id, course_id) => {
  const check = await db.query(
    "SELECT * FROM enroll WHERE user_id = $1 AND course_id = $2",
    [user_id, course_id]
  );
  return check.rowCount !== 0;
};

router.get("/:id", authenticate("user"), async (req, res) => {
  if (!(await checkOwns(req.user.user_id, req.params.id)))
    return res.sendStatus(401);

  const db_res = await db.query(
    "SELECT * FROM lectures WHERE lecture_id = $1",
    [req.params.id]
  );
  if (db_res.rowCount === 0) return res.sendStatus(404);

  res.send(db_res.rows[0]);
});

router.get("/course/:id", async (req, res) => {
  const db_res = await db.query(
    "SELECT * FROM course_lecture c INNER JOIN lectures l ON c.lecture_id = l.lecture_id WHERE c.course_id = $1 ",
    [req.params.id]
  );
  if (db_res.rowCount === 0) return res.sendStatus(404);
  res.send(
    db_res.rows.map((e) => {
      delete e.lecture_video_url;
      return e;
    })
  );
});

module.exports = router;
