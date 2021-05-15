const express = require("express");
const Joi = require("joi");

const db = require("../db");
const { authenticate } = require("../middlewares/auth");
const { validate } = require("../utils/validation");

const router = express.Router();

// returns all users with type parameter
router.get("/", authenticate("admin"), async (req, res) => {
  // get only users
  const users = (
    await db.query(`
    SELECT * FROM users u
    WHERE not exists(SELECT NULL FROM creators c WHERE c.creator_id = u.user_id);
    `)
  ).rows.map((e) => (e.type = "user"));

  // get only creators
  const creators = (
    await db.query(`
    SELECT * FROM creators INNER JOIN users u ON u.user_id = creators.creator_id;
  `)
  ).rows.map((e) => (e.type = "creator"));

  // get only admins
  const admins = (
    await db.query(`
    SELECT * FROM admins INNER JOIN users u ON u.user_id = admins.admin_id;
  `)
  ).rows.map((e) => (e.type = "admin"));

  const combined = [...users, ...creators, ...admins];

  res.send(combined);
});

// returns only creators
router.get("/creators", authenticate("admin"), async (req, res) => {
  // get only creators
  const creators = (
    await db.query(`
    SELECT * FROM creators INNER JOIN users u ON u.user_id = creators.creator_id;
  `)
  ).rows.map((e) => (e.type = "creator"));

  res.send(creators);
});

router.get("/:id", async (req, res) => {
  const user_id = req.params.id;

  const user = await db.query("SELECT * FROM users WHERE user_id = $1", [
    user_id,
  ]);

  if (user.rowCount === 0) return res.sendStatus(404);

  res.send(user.rows[0]);
});

// TODO implement update operation
router.put("/:id", async (req, res) => {
  res.sendStatus(501); // ! return not implemented
});

router.delete("/:id", authenticate("admin"), async (req, res) => {
  const user_id = req.params.id;

  // * user can't delete themselves, return forbidden
  if (user_id === req.user.user_id) return res.sendStatus(403);

  await db.query("DELETE FROM users WHERE user_id = $1", [user_id]);

  res.sendStatus(204);
});

// changes a user to a creator
router.post("/creators", authenticate("user"), async (req, res) => {
  // check if user is already a creator
  const check = await db.query(
    "SELECT NULL FROM creators WHERE creator_id = $1",
    [req.user.user_id]
  );

  if (check.rowCount !== 0) return res.sendStatus(400);

  const creator_schema = Joi.object({
    phone: Joi.string().min(10).max(12).required(),
  });

  const values = await validate(creator_schema, req.body, res);
  if (values === null) return;

  await db.query(
    "INSERT INTO creators (creator_id, creator_phone) VALUES ($1, $2)",
    [req.user.user_id, values.phone]
  );

  res.sendStatus(201);
});

module.exports = router;
