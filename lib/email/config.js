const fs = require("fs");
const assert = require("assert");
const shouldReportErrors = require("../../lib/shouldReportErrors");

// if(shouldReportErrors()){
assert(process.env.MAIL_HOST);
assert(process.env.MAIL_LOGIN);
assert(process.env.MAIL_PASSWORD);
// }
module.exports = {
	dev: {
		user: process.env.MAIL_LOGIN,
		pass: process.env.MAIL_PASSWORD,
		host: process.env.MAIL_HOST,
		port: 465,
		secure:true
	},
	staging: {
		user: process.env.MAIL_LOGIN,
		pass: process.env.MAIL_PASSWORD,
		host: process.env.MAIL_HOST,
		port: 465,
		secure:true
	},
	prod: {
		user: process.env.MAIL_LOGIN,
		pass: process.env.MAIL_PASSWORD,
		host: process.env.MAIL_HOST,
		port: 465,
		secure:true
	},
};
