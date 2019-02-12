const errors = require('../../../lib/errors');
const { check, validationResult } = require('express-validator/check');
const db = require('../../../db/connection');
const {encryptPassword} = require('../../../lib/security/password');
const mailer = require('../../../lib/email/mailer');
const config = require('../../../config');
const base64url = require('base64url');
const crypto = require('crypto');
const moment = require('../../../lib/moment');


async function updateProfile(req, res, next){
	const params = req.body;
	try{
		validationResult(req).throw();
	} catch (error) {
		return errors.Http400Error(error.mapped(), error, req, res);
	}
	try{
		let session = await db.Session.findOne({
			where: {
				authKey: res._headers.authorization
			},
			include: [
				{ model: db.User},
			]
		}).then(task => {
			const attr = {
				name: params.name,
				lastName: params.lastName,
				email: params.email,
				marketingAgree: params.marketing
			};
			return task.User.updateAttributes(attr);
		});
	} catch (error) {
		return errors.Http400Error("user_edit_error", null, req, res);
	}

	return res.json({
		success: true
	});
}

module.exports.updateProfile = updateProfile;
