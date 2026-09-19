const jwt = require('jsonwebtoken');

// Creates a signed JWT containing the user's id.
// This token is what the frontend stores and sends back on every
// request that needs to know "who is logged in".
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = generateToken;