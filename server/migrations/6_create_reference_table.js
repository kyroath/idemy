const db = require("../src/db");

exports.tags = [];

exports.migrate = async (client) => {
  const enable_uuid = `create extension "uuid-ossp";`;
  await db.query(enable_uuid);

  const create_reference_table = `
    CREATE TABLE course_reference (
      user_id INT NOT NULL REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
      course_id INT NOT NULL REFERENCES courses (course_id) ON DELETE CASCADE ON UPDATE CASCADE,
      reference_code uuid NOT NULL UNIQUE DEFAULT uuid_generate_v1(),

      CONSTRAINT pk_references PRIMARY KEY (user_id, course_id, reference_code)
    );
  `;

  await db.query(create_reference_table);

  const create_reference_index = `CREATE INDEX ix_reference_code ON course_reference (reference_code);`;
  await db.query(create_reference_index);
};

exports.rollback = async (client) => {
  const drop_reference_index = `DROP INDEX ix_reference_code`;
  await db.query(drop_reference_index);

  const drop_reference_table = `DROP TABLE course_reference`;
  await db.query(drop_reference_table);

  const disable_uuid = `DROP EXTENSION "uuid-ossp";`;
  await db.query(disable_uuid);
};
