const db = require("../src/db");

exports.tags = ["Create Table", "User"];

exports.migrate = async (client) => {
  const create_table = `
    CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      user_first_name VARCHAR(64) NOT NULL,
      user_last_name VARCHAR(64) NOT NULL,
      user_email VARCHAR(128) NOT NULL UNIQUE,
      user_password VARCHAR(128) NOT NULL,
      user_wallet INT NOT NULL DEFAULT 0,
      user_avatar TEXT
    );
  `;

  await db.query(create_table);

  const create_index = `
    CREATE INDEX idx_users_email
    ON users(user_email);
  `;

  await db.query(create_index);
};

exports.rollback = async (client) => {
  const drop_index = `DROP INDEX idx_users_email;`;

  await db.query(drop_index);

  const drop_table = `DROP TABLE users;`;

  await db.query(drop_table);
};
