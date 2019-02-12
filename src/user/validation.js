const { check, body, param, validationResult, checkSchema, header } = require("express-validator/check");


module.exports.sessionKeep = [
	header("Authorization")
		.exists().withMessage("auth_missing")
];
