const db = require("../src/db");

exports.tags = ["table", "course"];

exports.migrate = async (client) => {
  const create_courses_table = `
    CREATE TABLE courses (
      course_id SERIAL PRIMARY KEY,
      course_name TEXT NOT NULL,
      course_price MONEY NOT NULL,
      course_description TEXT NOT NULL,
      course_summary TEXT NOT NULL,
      course_max_discount DECIMAL NOT NULL DEFAULT 0,
      course_thumbnail TEXT NOT NULL DEFAULT 'https://picsum.photos/500/500',
      course_can_discount BOOLEAN NOT NULL DEFAULT FALSE,
      course_publish_date timestamptz,
      
      creator_id INT NOT NULL,
      CONSTRAINT fk_courses_creators
          FOREIGN KEY (creator_id)
          REFERENCES creators (creator_id)
              ON UPDATE CASCADE
              ON DELETE CASCADE 
    );
  `;

  await db.query(create_courses_table);

  const create_publish_table = `
    CREATE TABLE publish (
      creator_id INT NOT NULL,
      course_id INT NOT NULL,

      CONSTRAINT pk_publish
          PRIMARY KEY (creator_id, course_id),

      CONSTRAINT fk_publish_creators
          FOREIGN KEY (creator_id)
          REFERENCES creators (creator_id)
              ON UPDATE CASCADE
              ON DELETE CASCADE,

      CONSTRAINT fk_publish_courses
          FOREIGN KEY (course_id)
          REFERENCES courses (course_id)
              ON UPDATE CASCADE
              ON DELETE CASCADE
    );
  `;

  await db.query(create_publish_table);

  const create_function_insertPublish = `
    CREATE FUNCTION insertPublish() RETURNS TRIGGER AS $connectPublish$
    BEGIN
        INSERT INTO publish (creator_id, course_id) VALUES (new.creator_id, new.course_id);
        RETURN new;
    END;
    $connectPublish$ LANGUAGE plpgsql;
  `;

  await db.query(create_function_insertPublish);

  const create_trigger_connectPublish = `
    CREATE TRIGGER connectPublish
    AFTER INSERT ON courses
    FOR EACH ROW
    EXECUTE PROCEDURE insertPublish();
  `;

  await db.query(create_trigger_connectPublish);
};

exports.rollback = async (client) => {
  const drop_publish_table = `DROP TABLE publish;`;
  await db.query(drop_publish_table);

  const drop_courses_table = `DROP TABLE courses;`;
  await db.query(drop_courses_table);

  const drop_function_insertPublish = `DROP FUNCTION insertpublish() CASCADE;`;
  await db.query(drop_function_insertPublish);
};
