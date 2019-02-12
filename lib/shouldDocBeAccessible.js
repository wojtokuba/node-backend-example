const assert = require("assert");

assert(process.env.APP_ENV);

module.exports = function () {
	return process.env.APP_ENV === "dev" || process.env.APP_ENV === "staging";
};
