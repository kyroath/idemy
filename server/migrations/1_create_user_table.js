const db = require("../src/db");

exports.tags = ["Create Table", "User"];

exports.migrate = async (client) => {
  const create_user_table = `
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

  await db.query(create_user_table);

  const create_creators_table = `
    CREATE TABLE creators (
      creator_id INTEGER PRIMARY KEY,
      creator_phone TEXT NOT NULL,
      CONSTRAINT fk_creators_users
          FOREIGN KEY (creator_id)
          REFERENCES users (user_id)
              ON DELETE CASCADE
    );
  `;

  await db.query(create_creators_table);

  const create_admins_table = `
    CREATE TABLE admins (
      admin_id INTEGER PRIMARY KEY,
      CONSTRAINT fk_admins_users
          FOREIGN KEY (admin_id)
          REFERENCES users (user_id)
              ON DELETE CASCADE
    );
  `;

  await db.query(create_admins_table);
};

exports.rollback = async (client) => {
  const drop_admins_table = `DROP TABLE admins;`;
  await db.query(drop_admins_table);

  const drop_creators_table = `DROP TABLE creators;`;
  await db.query(drop_creators_table);

  const drop_users_table = `DROP TABLE users;`;
  await db.query(drop_users_table);
};
