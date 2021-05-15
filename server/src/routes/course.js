const express = require("express");
const db = require("../db");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const { page, limit, search, loc, sort, direction } = req.query;

  // set defaults
  if (!page || page < 1) page = 1;
  if (!limit || limit < 1) limit = 20;
  if (!search) {
    search = "%%";
  } else {
    search = `%${search}%`;
  }
  if (
    !loc ||
    ["course_name", "course_price", "course_publish_date"].findIndex(sort) ===
      -1 // invalid seach column)
  )
    loc = "course_name";
  if (
    !sort ||
    ["course_name", "course_price", "course_publish_date"].findIndex(sort) ===
      -1 // invalid sort column
  )
    sort = "course_name";
  if (!direction || (direction !== "asc" && direction !== "desc"))
    direction = "asc";

  const query = `SELECT * FROM courses WHERE $1 LIKE $2 ORDER BY $3 ${direction} LIMIT $4 OFFSET $5`;

  const db_res = await db.query(query, [
    loc,
    search,
    sort,
    limit,
    limit * (page - 1),
  ]);

  res.send(db_res.rows);
});

router.get("/:id", async (req, res) => {
  const db_res = await db.query("SELECT * FROM courses WHERE course_id = $1", [
    req.params.id,
  ]);
  if (db_res.rowCount === 0) return res.sendStatus(404);

  res.send(db_res.rows[0]);
});

// TODO implement course update method
router.put("/:id", authenticate("creator"), async (req, res) => {
  res.sendStatus(501); // ! Not implemented
});

router.delete("/:id", authenticate("creator"), async (req, res) => {
  // check if course exists
  let db_res = await db.query("SELECT NULL FROM courses WHERE course_id = $1", [
    req.params.id,
  ]);
  if (db_res.rowCount === 0) return res.sendStatus(404); // course doesn't exist

  const user = req.user;
  if (user.role === "creator") {
    // check if this is the creator of the course
    db_res = await db.query(
      "SELECT NULL FROM courses WHERE course_id = $1 AND creator_id = $2",
      [req.params.id, user.creator_id]
    );
    if (db_res.rowCount === 0) return res.sendStatus(401); // Not the creator
  }

  await db.query("DELETE FROM courses WHERE course_id = $1", [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;
