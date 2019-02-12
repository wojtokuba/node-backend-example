const fs = require("fs");
const assert = require("assert");
const shouldReportErrors = require("../../lib/shouldReportErrors");

if(shouldReportErrors()){
	assert(process.env.DB_USERNAME);
	assert(process.env.DB_PASSWORD);
	assert(process.env.DB_NAME);
	assert(process.env.DB_HOSTNAME);
}
module.exports = {
	dev: {
		username: "root",
		password: "",
		database: "example",
		host: "127.0.0.1",
		dialect: "mysql"
	},
	staging: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOSTNAME,
		dialect: "mysql"
	},
	prod: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOSTNAME,
		dialect: "mysql"
	}
};
