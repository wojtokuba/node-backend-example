const crypto = require("crypto");


module.exports.encryptPassword = function(plain){
	return crypto.createHash("sha256").update(plain).digest("hex");
};
