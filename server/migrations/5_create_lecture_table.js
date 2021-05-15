const db = require("../src/db");

exports.tags = [];

exports.migrate = async (client) => {
  const create_lecture_table = `
    CREATE TABLE lectures (
      lecture_id SERIAL PRIMARY KEY,
      lecture_length DECIMAL NOT NULL,
      lecture_video_url TEXT NOT NULL,
      lecture_description TEXT NOT NULL,
      lecture_title TEXT NOT NULL,
      lecture_file_url TEXT,
      lecture_thumbnail TEXT NOT NULL DEFAULT 'https://picsum.photos/500/500',
      lecture_is_free BOOLEAN NOT NULL DEFAULT FALSE
    );
  `;

  await db.query(create_lecture_table);

  const create_course_lecture_table = `
    CREATE TABLE course_lecture (
      course_id INT NOT NULL REFERENCES courses (course_id) ON DELETE CASCADE ON UPDATE CASCADE,
      lecture_id INT NOT NULL REFERENCES lectures (lecture_id) ON DELETE CASCADE ON UPDATE CASCADE,
      lecture_index INT DEFAULT 0
    );
  `;

  await db.query(create_course_lecture_table);
};

exports.rollback = async (client) => {
  const drop_course_lecture_table = `DROP TABLE course_lecture`;
  await db.query(drop_course_lecture_table);

  const drop_lecture_table = `DROP TABLE lectures;`;
  await db.query(drop_lecture_table);
};
