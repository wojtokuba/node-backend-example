const assert = require("assert");
const env  = process.env.APP_ENV ? process.env.APP_ENV : "dev";

module.exports = function () {
	return env  === "prod" || env === "staging";
};
