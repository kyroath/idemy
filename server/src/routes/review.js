const express = require("express");
const Joi = require("joi");
const db = require("../db");

const { authenticate } = require("../middlewares/auth");
const { validate } = require("../utils/validation");

const router = express.Router();

router.get("/:id", async (req, res) => {
  // check
  const check = await db.query(
    "SELECT NULL FROM courses WHERE course_id = $1",
    [req.params.id]
  );
  if (check.rowCount === 0) return res.sendStatus(400);

  const db_res = await db.query("SELECT * FROM reviews WHERE course_id = $1", [
    req.params.id,
  ]);
  res.send(db_res.rows);
});

router.post("/:id", authenticate("user"), async (req, res) => {
  // check if enrolled
  const check = await db.query(
    "SELECT * FROM enroll WHERE user_id = $1 AND course_id = $2",
    [req.user.user_id, req.params.id]
  );

  if (check.rowCount === 0) return res.sendStatus(404);

  // check body
  const schema = Joi.object({
    review_title: Joi.string().min(4).required(),
    review_text: Joi.string().min(4).required(),
    review_rating: Joi.number().min(1).max(5).required(),
  });

  const values = await validate(schema, req.body, res);
  if (values === null) return;

  await db.query(
    "INSERT INTO reviews (user_id, course_id, review_title, review_text, review_rating) VALUES ($1, $2, $3, $4, $5)",
    [
      req.user.user_id,
      req.params.id,
      values.review_title,
      values.review_text,
      values.review_rating,
    ]
  );

  res.sendStatus(201);
});

module.exports = router;
