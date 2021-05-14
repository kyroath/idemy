const db = require("../db");

const getRole = async (user_id) => {
  let role = "user";

  // user exists, get role
  const creator = await db.query(
    "SELECT creator_id FROM creators WHERE creator_id = $1",
    [user_id]
  );

  // this is quite inefficient but ¯\_(ツ)_/¯
  if (creator.rowCount !== 0) {
    role = "creator";
  } else {
    const admin = await db.query(
      "SELECT admin_id FROM admins WHERE admin_id = $1",
      [user_id]
    );

    if (admin.rowCount !== 0) {
      role = "admin";
    }
  }

  return role;
};

module.exports = {
  getRole,
};
