const jwt = require('jsonwebtoken');

const { secretKey } = require('../config/jwtSecret');


function createToken(str) {
  return jwt.sign({ str }, secretKey, { expiresIn: 600 });
}

// async function checkToken() {
//
// }

module.exports = {
  createToken,
};
