const db = require("../src/db");

exports.tags = [];

exports.migrate = async (client) => {
  const create_review_table = `
    CREATE TABLE reviews (
      user_id INT NOT NULL REFERENCES users (user_id),
      course_id INT NOT NULL REFERENCES courses (course_id),
      review_title TEXT NOT NULL,
      review_text TEXT NOT NULL,
      review_rating INT NOT NULL DEFAULT 1,

      CONSTRAINT pk_reviews PRIMARY KEY (user_id, course_id)
    );
  `;

  await db.query(create_review_table);
};

exports.rollback = async (client) => {
  const drop_review_table = `DROP TABLE reviews`;
  await db.query(drop_review_table);
};
