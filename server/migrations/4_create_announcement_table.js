const db = require("../src/db");

exports.tags = [];

exports.migrate = async (client) => {
  const create_announcement_table = `
    CREATE TABLE announcement (
      creator_id INT,
      course_id INT,
      announcement TEXT NOT NULL,

      CONSTRAINT fk_announcement_creators
          FOREIGN KEY (creator_id)
          REFERENCES creators (creator_id)
              ON DELETE CASCADE
              ON UPDATE CASCADE,

      CONSTRAINT fk_announcement_courses
          FOREIGN KEY (course_id)
          REFERENCES courses (course_id)
              ON UPDATE CASCADE
              ON DELETE CASCADE
    );
  `;

  await db.query(create_announcement_table);
};

exports.rollback = async (client) => {
  const drop_announcement_table = `DROP TABLE announcement;`;
  await db.query(drop_announcement_table);
};
