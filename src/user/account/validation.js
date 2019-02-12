const { check, body, param, validationResult, checkSchema, header } = require("express-validator/check");


module.exports.updateProfile = [
	body("name")
		.exists().withMessage("name_not_set")
		.isString().withMessage("name_not_string"),
	body("lastName")
		.exists().withMessage("lastName_not_set")
		.isString().withMessage("lastName_not_string"),
	body("email")
		.exists().withMessage("email_not_set")
		.isEmail().withMessage("email_wrong_complexity"),
	body("marketing")
		.exists().withMessage("marketing_not_set")
		.isBoolean().withMessage("marketing_not_boolean"),
	header("Authorization")
		.exists().withMessage("auth_missing")
];
