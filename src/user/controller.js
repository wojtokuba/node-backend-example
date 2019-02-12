const errors = require("../../lib/errors");
const { check, validationResult } = require("express-validator/check");
const models = require("../../db/connection").models;

async function sessionKeep(req, res, next){
	try{
		validationResult(req).throw();
	} catch (error) {
		return errors.Http400Error(error.mapped(), error, req, res);
	}

	return res.json({
		authToken: req.headers.authorization
	});
}
module.exports.sessionKeep = sessionKeep;
