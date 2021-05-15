// reads .env file and expands it
// via dotenv and dotenv-expand
const readEnv = () => {
  const dotenv = require("dotenv");
  const dotenvExpand = require("dotenv-expand");
  const env = dotenv.config();
  dotenvExpand(env);
};

module.exports = {
  readEnv,
};
