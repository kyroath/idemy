const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const db = require("../db");

const { authenticate } = require("../middlewares/auth");

const { validate } = require("../utils/validation");
const { generateToken } = require("../utils/jwt");

const router = express.Router();

router.post("/register", async (req, res) => {
  const register_schema = Joi.object({
    first_name: Joi.string().alphanum().min(3).max(64).required(),
    last_name: Joi.string().alphanum().min(3).max(64).required(),
    password: Joi.string().min(8).required(),
    rpassword: Joi.any().valid(Joi.ref("password")).required(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "edu", "tr"] },
      })
      .required(),
  });

  const values = await validate(register_schema, req.body, res);
  if (values === null) return;

  // there is no problem with request body

  // insert into db
  const insert_query = `INSERT INTO users (
                          user_first_name,
                          user_last_name,
                          user_email,
                          user_password,
                          user_avatar
                        ) VALUES (
                          $1, $2, $3, $4, $5
                        ) RETURNING *;`;

  const avatar_name = `${values.first_name}+${values.last_name}`;
  const avatar_url = `https://ui-avatars.com/api/?name=${avatar_name}&background=0D8ABC&color=fff`;

  const hashed_password = await bcrypt.hash(values.password, 12);

  try {
    const db_res = await db.query(insert_query, [
      values.first_name,
      values.last_name,
      values.email,
      hashed_password,
      avatar_url,
    ]);

    const user = db_res.rows[0];
    delete user.user_password;

    // return object if no error
    res
      .status(201)
      .send({ ...db_res.rows[0], token: generateToken({ id: user.user_id }) });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.post("/login", async (req, res) => {
  const login_schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "edu", "tr"] },
      })
      .required(),

    password: Joi.string().min(8).required(),
  });

  const values = await validate(login_schema, req.body, res);
  if (values === null) return;

  // get user
  const select_user_by_email = `SELECT * FROM users WHERE user_email = $1`;

  try {
    const db_res = await db.query(select_user_by_email, [values.email]);

    // email does not exist
    if (db_res.rowCount === 0) return res.sendStatus(404);

    const user = db_res.rows[0];

    // password is not correcct
    if (!(await bcrypt.compare(values.password, user.user_password)))
      return res.sendStatus(404);

    delete user.user_password;

    // return object if no error
    res.send({ ...db_res.rows[0], token: generateToken({ id: user.user_id }) });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.get("/me", authenticate, (req, res) => {
  delete req.user.user_password;
  res.send({ ...req.user, token: req.token });
});

module.exports = router;
