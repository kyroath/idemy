const db = require("../src/db");

exports.tags = [];

exports.migrate = async (client) => {
  const create_question_table = `
    CREATE TABLE questions (
      question_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users (user_id),
      question_text TEXT NOT NULL,
      question_date timestamptz NOT NULL DEFAULT now()
    );
  `;

  await db.query(create_question_table);

  const create_answer_table = `
    CREATE TABLE answers (
      question_id INT NOT NULL REFERENCES questions (question_id),
      creator_id INT NOT NULL REFERENCES creators (creator_id),
      answer_text TEXT NOT NULL,
      answer_date timestamptz NOT NULL DEFAULT now(),

      CONSTRAINT pk_answers PRIMARY KEY (question_id, creator_id, answer_date)
    );
  `;

  await db.query(create_answer_table);
};

exports.rollback = async (client) => {
  const drop_answer_table = `DROP TABLE answers;`;
  await db.query(drop_answer_table);

  const drop_question_table = `DROP TABLE questions;`;
  await db.query(drop_question_table);
};
