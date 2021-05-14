const db = require("../db");
const { verifyToken, generateToken } = require("../utils/jwt");

const authenticate = async (req, res, next) => {
  let token;
  let error = true;

  // get token from authorization header
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
      error = false;
    }
  }

  // send 401 Unauthorized if no token found
  if (error) return res.sendStatus(401);

  const verifiedToken = verifyToken(token);

  // not a valid token, send 401 Unauthorized
  if (verifiedToken === null) return res.sendStatus(401);

  // valid token, get user
  const select_user_by_id = `SELECT * FROM users WHERE user_id = $1`;
  const db_res = await db.query(select_user_by_id, [verifiedToken.id]);

  // if no user with the ID is found
  if (db_res.rowCount === 0) return res.sendStatus(401);

  const user = db_res.rows[0];

  // generate a new token
  const jwt = generateToken({ id: user.user_id });

  req.user = user;
  req.token = jwt;
  next();
};

module.exports = {
  authenticate,
};
