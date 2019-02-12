const auth = require("basic-auth");

const admins = { "admin": { password: "Czipsy1" }, };

module.exports = function (request, response, next) {
	var user = auth(request);
	if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
		response.set("WWW-Authenticate", "Basic realm=\"DocPrivilege\"");
		return response.status(401).send();
	}
	return next();
};
