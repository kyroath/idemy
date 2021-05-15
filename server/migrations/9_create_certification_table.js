const db = require("../src/db");

exports.tags = [];

exports.migrate = async (client) => {
  const create_certificate_table = `
    CREATE TABLE certificate (
      certificate_id SERIAL PRIMARY KEY,
      certificate_title TEXT NOT NULL,
      certificate_text TEXT NOT NULL,
      course_id INT NOT NULL REFERENCES courses (course_id)
    );
  `;

  await db.query(create_certificate_table);

  const create_earn_table = `
    CREATE TABLE earn (
      certificate_id INT NOT NULL REFERENCES certificate (certificate_id),
      user_id INT NOT NULL REFERENCES users (user_id),
      certification_date timestamptz NOT NULL DEFAULT now()
    );
  `;

  await db.query(create_earn_table);
};

exports.rollback = async (client) => {
  const drop_earn_table = `DROP TABLE earn;`;
  await db.query(drop_earn_table);

  const drop_certificate_table = `DROP TABLE certificate`;
  await db.query(drop_certificate_table);
};
