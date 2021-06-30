const first = require("@neverusethis/a-first");

module.exports = function () {
  console.log("calling `second`");
  return [first(), " and second"].join("");
};
