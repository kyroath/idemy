const express = require("express");
const Joi = require("joi");

const db = require("../db");
const { authenticate } = require("../middlewares/auth");
const { validate } = require("../utils/validation");

const router = express.Router();

router.get("/:id", (req, res) => {
  const db_res = await db.query(
    "SELECT * FROM announcement WHERE course_id = $1",
    [req.params.id]
  );
  res.send(db_res.rows);
});

router.post("/:id", authenticate("creator"), async (req, res) => {
  // check if course exists
  const check = await db.query(
    "SELECT NULL FROM courses WHERE course_id = $1",
    [req.params.id]
  );
  if (check.rowCount === 0) return res.sendStatus(404);

  // check if user owns the course
  const course = await db.query(
    "SELECT NULL FROM courses WHERE course_id = $1 AND creator_id = $2",
    [req.params.id, req.user.user_id]
  );
  if (course.rowCount === 0) return res.sendStatus(401);

  // check text
  const schema = Joi.object({
    announcement: Joi.string().min(4).required(),
  });

  const values = await validate(schema, req.body, res);

  await db.query(
    "INSERT INTO announcement (course_id, creator_id, announcement) VALUES ($1, $2, $3)",
    [req.params.id, req.user.user_id, values.announcement]
  );

  res.sendStatus({
    creator_id: req.user.user_id,
    course_id: req.params.id,
    announcement: values.announcement,
  });
});
