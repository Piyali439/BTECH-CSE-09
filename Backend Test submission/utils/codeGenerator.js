const { nanoid } = require("nanoid");

function generateCode(length = 7) {
  return nanoid(length); // e.g. "Ab3DkZ9"
}

module.exports = generateCode;
