const jwt = require("jsonwebtoken");

const generateToken = (val) => {
  return jwt.sign(val, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24, // 24 hours
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
