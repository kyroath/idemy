const db = require("../src/db");

exports.tags = [];

exports.migrate = async (client) => {
  const create_wishlist_table = `
    CREATE TABLE wishlist (
      user_id INT,
      course_id INT,

      CONSTRAINT fk_wishlist_users
          FOREIGN KEY (user_id)
          REFERENCES users (user_id)
              ON UPDATE CASCADE
              ON DELETE CASCADE,

      CONSTRAINT fk_wishlist_courses
          FOREIGN KEY (course_id)
          REFERENCES courses (course_id)
              ON UPDATE CASCADE
              ON DELETE CASCADE,

      CONSTRAINT pk_wishlist
          PRIMARY KEY (user_id, course_id)
    );
  `;

  await db.query(create_wishlist_table);

  const create_wishlist_courses_view = `
    CREATE VIEW wishlist_courses AS
    SELECT * FROM wishlist INNER JOIN courses USING (course_id);
  `;

  await db.query(create_wishlist_courses_view);
};

exports.rollback = async (client) => {
  const drop_wishlist_courses_view = `DROP VIEW wishlist_courses;`;
  await db.query(drop_wishlist_courses_view);

  const drop_wishlist_table = `DROP TABLE wishlist`;
  await db.query(drop_wishlist_table);
};
