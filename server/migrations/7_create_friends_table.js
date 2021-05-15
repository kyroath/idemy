const db = require("../src/db");

exports.tags = [];

exports.migrate = async (client) => {
  const create_friends_table = `
    CREATE TABLE friends (
      user_id INT NOT NULL REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
      friend_id INT NOT NULL REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,

      UNIQUE (user_id, friend_id)
    );
  `;

  await db.query(create_friends_table);
};

exports.rollback = async (client) => {
  const drop_friends_table = `DROP TABLE friends;`;
  await db.query(drop_friends_table);
};
