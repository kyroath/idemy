const db = require("../src/db");

exports.tags = [];

exports.migrate = async (client) => {
  const create_notes_table = `
    CREATE TABLE notes (
      user_id INT NOT NULL REFERENCES users (user_id),
      lecture_id INT NOT NULL REFERENCES lectures (lecture_id),
      note_date timestamptz NOT NULL DEFAULT now(),
      note_title TEXT NOT NULL,
      note_image TEXT,

      CONSTRAINT pk_notes PRIMARY KEY (user_id, lecture_id, note_date)
    );
  `;

  await db.query(create_notes_table);
};

exports.rollback = async (client) => {
  const drop_notes_table = `DROP TABLE notes;`;
  await db.query(drop_notes_table);
};
