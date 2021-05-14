const { Pool } = require("pg");
const { readEnv } = require("../utils/env");

let poolSettings = {};

if (!process.env.DATABASE_URL || process.env.NODE_ENV === "development") {
  // this means we're in a local environment
  readEnv();
  poolSettings.connectionString = process.env.DATABASE_URL;
} else {
  poolSettings.connectionString = process.env.DATABASE_URL;
  poolSettings.ssl = { rejectUnathorized: false };
}

const pool = new Pool(poolSettings);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
