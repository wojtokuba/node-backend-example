"use strict";
const nodemailer = require("nodemailer");
const config = require("./config");
const environment = process.env.APP_ENV || "dev";
const errors = require("../errors");
const globalConfig = require("../../config");

const transport = nodemailer.createTransport({
	host: config[environment].host,
	port: config[environment].port,
	secure: config[environment].secure,
	auth: {
		user: config[environment].user,
		pass: config[environment].pass
	}
});

module.exports.sendMail = function(recipients, subject, html){
	let mailOptions = {
		from: globalConfig.mailFrom,
		to: recipients,
		subject: subject,
		html: html
	};

	return transport.sendMail(mailOptions)
		.catch((error) => {
			throw errors.Internal500Error("mail_not_send", error);
		});
};
