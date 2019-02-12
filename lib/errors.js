const raven = require("./sentry");
const assert = require("assert");
const shouldReportError = require("./shouldReportErrors");

assert(process.env.APP_ENV);

class Errors {
	static BasicError(errorMessage, errorData) {
		const object = {
			message: errorMessage,
			details: errorData,
			type: "BasicErrorObject"
		};
		raven.captureException(object);

		return object;
	}

	static DbError(errorMessage, errorData) {
		const object = {
			message: errorMessage,
			details: errorData,
			type: "DbErrorObject"
		};
		raven.captureException(object);


		return object;
	}

	static GoogleMapsError(errorMessage, errorData) {
		const object = {
			message: errorMessage,
			details: errorData,
			type: "GoogleMapsErrorObject"
		};
		raven.captureException(object);


		return object;
	}

	static Http500Error(errorMessage, errorData, req, res) {
		const object = {
			message: errorMessage,
			details: {
				params: req.params === undefined ? null : req.params,
				body: req.body
			},
			type: "Http500ErrorObject"
		};
		raven.captureException(object);

		res.status(500);

		return res.json(object);
	}


	// Http Not Logged errors
	static Http400Error(errorMessage, errorData, req, res) {
		const object = {
			message: errorMessage,
			details: {
				params: req.params === undefined ? null : req.params,
				body: req.body
			},
			type: "Http400ErrorObject"
		};
		res.status(400);

		return res.json(object);
	}

	// Http Not Logged errors
	static Http404Error(errorMessage, errorData, req, res) {
		const object = {
			message: errorMessage,
			details: {
				params: req.params === undefined ? null : req.params,
				body: req.body
			},
			type: "Http404ErrorObject"
		};
		res.status(404);

		return res.json(object);
	}
	// Http Not Logged errors
	static Http403Error(errorMessage, errorData, req, res) {
		const object = {
			message: errorMessage,
			details: {
				params: req.params === undefined ? null : req.params,
				body: req.body
			},
			type: "Http403ErrorObject",
		};
		res.status(403);

		return res.json(object);
	}

	static Internal500Error(errorMessage, errorData) {
		const object = {
			message: errorMessage,
			details: errorData,
			type: "Internal500ErrorObject"
		};
		raven.captureException(object);


		return object;
	}
}
module.exports = Errors;
