const db = require("../db");
const { verifyToken, generateToken } = require("../utils/jwt");
const { getRole } = require("../utils/role");

const authenticate = (type) => {
  return async (req, res, next) => {
    type = type.toLowerCase();

    if (["admin", "creator", "user"].findIndex((e) => e === type) === -1)
      return res.sendStatus(401);

    let query = "";

    switch (type) {
      case "admin":
        query =
          "SELECT * FROM admins INNER JOIN users u ON u.user_id = admins.admin_id WHERE admin_id = $1";
        role = "admin";
        break;
      case "creator":
        query =
          "SELECT * FROM creators INNER JOIN users u ON u.user_id = creators.creator_id WHERE creator_id = $1";
        role = "creator";
        break;
      case "user":
        query = "SELECT * FROM users WHERE user_id = $1";
        role = "user";
        break;
    }

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
    let db_res = await db.query(query, [verifiedToken.id]);

    // if no user with the ID is found
    if (db_res.rowCount === 0 && type === "creator") {
      // check if the user is admin
      db_res = await db.query(
        "SELECT * FROM admins INNER JOIN users u ON u.user_id = admins.admin_id WHERE admin_id = $1",
        [verifiedToken.id]
      );
      if (db_res.rowCount === 0) return res.sendStatus(401);
    } else if (db_res.rowCount === 0) return res.sendStatus(401);

    const user = db_res.rows[0];
    user.role = await getRole(user.user_id);

    // generate a new token
    const jwt = generateToken({ id: user.user_id });

    req.user = user;
    req.token = jwt;
    next();
  };
};

module.exports = {
  authenticate,
};
