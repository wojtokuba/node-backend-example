const moment = require('moment-timezone');

module.exports = function(timezone = "Europe/Warsaw"){
	return moment().tz(timezone);
};
