const errors = require('../../../lib/errors');
const { check, validationResult } = require('express-validator/check');
const db = require('../../../db/connection');
const {encryptPassword} = require('../../../lib/security/password');
const mailer = require('../../../lib/email/mailer');
const config = require('../../../config');
const base64url = require('base64url');
const crypto = require('crypto');
const moment = require('../../../lib/moment');

async function registerUser(req, res, next){
	const params = req.body;
	try{
		validationResult(req).throw();
	} catch (error) {
		return errors.Http400Error(error.mapped(), error, req, res);
	}
	const token = base64url(crypto.randomBytes(100));
	try{
		let user = await db.User.create({
			name: params.name,
			lastName: params.lastName,
			email: params.email,
			marketingAgree: params.marketing,
			password: encryptPassword(params.password),
			activateKey: token
		})
		.then((task) => {
			return task.save();
		});
	} catch (error) {
		return errors.Http400Error("user_already_exists", null, req, res);
	}

	const emailTemplate = config.emailTemplates.newAccount;
	let emailBody = emailTemplate.text;
	emailBody = emailBody.replace(/%email%/g, params.email);
	emailBody = emailBody.replace(/%activationLink%/g, token);
	try {
		await mailer.sendMail(params.email, emailTemplate.subject, emailBody);
	} catch (error) {
		console.log(error.details);
		return errors.Http500Error(error.message, error.details, req, res);
	}

	return res.json({
		success: true,
		email: params.email,
		name: params.name,
		lastName: params.lastName
	});
}

module.exports.registerUser = registerUser;

async function activateUser(req, res, next){
	const params = req.body;
	let user = null;
	try{
		validationResult(req).throw();
	} catch (error) {
		return errors.Http400Error(error.mapped(), error, req, res);
	}

	try{
		user = await db.User.findOne({
			where: {
				activateKey: req.body.token
			}
		}).then((task) => {
				try{
					return task.update({
						activateKey: null,
						isActive: true
					});
				} catch (e){
				}
			});
	} catch (error) {
		return errors.Http404Error("user_activation_error", null, req, res);
	}

	if(user == null){
		return errors.Http404Error("token_not_exists", null, req, res);
	}
	return res.json({
		success: true,
		email: user.email,
		name: user.name,
		lastName: user.lastName
	});
}

module.exports.activateUser = activateUser;

async function loginUser(req, res, next){
	const params = req.body;
	let user = null;
	try{
		validationResult(req).throw();
	} catch (error) {
		return errors.Http400Error(error.mapped(), error, req, res);
	}

	try{
		user = await db.User.findOne({
			where: {
				email: req.body.email,
				password: encryptPassword(req.body.password),
				isActive: true
			}
		});
	} catch (error) {
		console.log(error);
		return errors.Http404Error("user_login_error", null, req, res);
	}

	if (user == null) {
		return errors.Http404Error( "user_login_error", null, req, res );
	}

	const token = base64url(crypto.randomBytes(100));
	let dateSessionDie = moment().add(30, 'm');
	try{
		let session = await db.Session.create({
			user: user.id,
			activeTo: dateSessionDie,
			authKey: token
		})
			.then((task) => {
				return task.save();
			});
	} catch (error) {
		console.log(error);
		return errors.Http400Error("session_start_error", null, req, res);
	}

	return res.json({
		success: true,
		token: token,
		user: {
			name: user.name,
			lastName: user.lastName,
			email: user.email,
			marketing: user.marketingAgree
		},
	});
}

module.exports.loginUser = loginUser;

async function validateToken(req, res, next){
	const params = req.body;
	let user = null;
	try{
		validationResult(req).throw();
	} catch (error) {
		return errors.Http400Error(error.mapped(), error, req, res);
	}

	try{
		let accessToken = await db.Session.findOne({
			where: {
				authKey: params.token
			}
		});
		if(accessToken === null){
			return res.json({
				success: false
			});
		}
		else{
			return res.json({
				success: true
			})
		}
	} catch (e){
		return res.json({
			success: false
		});
	}
}

module.exports.validateToken = validateToken;
