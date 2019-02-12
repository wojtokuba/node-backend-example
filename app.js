const createError = require("http-errors");
const app = require("./app.lib");
const errors = require("./lib/errors");
const assert = require("assert");
assert(process.env.FRONTEND_URL);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "dev" ? err : {};

	if (err.status === 404) {
		return errors.Http404Error(err.message, err, req, res);
	}
	// render the error page
	res.status(err.status || 500);
	res.json(errors.BasicError(err.message, { code: err.status || 500 }));
});

module.exports = app;
