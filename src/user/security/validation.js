const { check, body, param, validationResult, checkSchema } = require("express-validator/check");


module.exports.registerUser = [
	body("name")
		.exists().withMessage("name_not_set")
		.isString().withMessage("name_not_string"),
	body("lastName")
		.exists().withMessage("lastName_not_set")
		.isString().withMessage("lastName_not_string"),
	body("email")
		.exists().withMessage("email_not_set")
		.isEmail().withMessage("email_wrong_complexity"),
	body("password")
		.exists().withMessage("password_not_set")
		.isString().withMessage("password_not_string")
		.matches(/^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/).withMessage("password_wrong_complexity"),
	body("marketing")
		.exists().withMessage("marketing_not_set")
		.isBoolean().withMessage("marketing_not_boolean"),
];
module.exports.activateUser = [
	body("token")
		.exists().withMessage("token_not_exists")
		.isString().withMessage("token_not_exists"),
];

module.exports.loginUser = [
	body("email")
		.exists().withMessage("email_not_set")
		.isEmail().withMessage("email_wrong_complexity"),
	body("password")
		.exists().withMessage("password_not_set")
		.isString().withMessage("password_not_string")

];
module.exports.validateToken = [
	body("token")
		.exists().withMessage("token_not_set")
		.isString().withMessage("token_not_string")
];
