const db = require('../../db/connection');
const errors = require('../../lib/errors');
const { check, validationResult } = require('express-validator/check');
const moment = require("../../lib/moment");
const base64url = require('base64url');
const crypto = require('crypto');

module.exports.required = async function(req, res, next){
	try{
		let accessToken = await db.Session.findOne({
			where: {
				authKey: req.headers.authorization
			}
		});
		if(accessToken === null){
			return errors.Http403Error("Access denied", null, req, res);
		}
		else{
			let now = new Date();
			let sessionTo = new Date(accessToken.dataValues.activeTo);
			if(now >= sessionTo){
				return errors.Http403Error("Access denied", null, req, res);
			}
			now.setMinutes(now.getMinutes()+30);
			const token = base64url(crypto.randomBytes(100));
			await db.Session.update(
				{
					activeTo: now,
					authKey: token
				},
				{ where: { id: accessToken.dataValues.id } }
			).then(() => {
				res.setHeader('Authorization', token);

				return next();
			});

		}
	} catch (e){
		return errors.Http403Error("Access denied", e, req, res);
	}
};
