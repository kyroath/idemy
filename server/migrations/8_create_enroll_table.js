const db = require("../src/db");

exports.tags = [];

exports.migrate = async (client) => {
  const create_enroll_table = `
    CREATE TABLE enroll (
      user_id INT NOT NULL REFERENCES users (user_id),
      course_id INT NOT NULL REFERENCES courses (course_id),
      reference_code uuid REFERENCES course_reference (reference_code)
    );
  `;

  await db.query(create_enroll_table);
};

exports.rollback = async (client) => {
  const drop_enroll_table = `DROP TABLE enroll`;
  await db.query(drop_enroll_table);
};
