require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRECT_KEY = process.env.SECRECT_KEY;

function generateToken(payload) {
  return jwt.sign(payload, SECRECT_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, SECRECT_KEY);
}

module.exports = {
  generateToken,
  verifyToken,
};
