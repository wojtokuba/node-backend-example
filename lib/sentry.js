const Raven = require("raven");
const shouldReportErrors = require("./shouldReportErrors");
Raven.disableConsoleAlerts();

Raven.config(shouldReportErrors() && "").install();

if(!shouldReportErrors()) {
	console.log("\x1b[31mRaven error reporting disabled on \x1b[4mDEV\x1b[0m \x1b[31menvironment.\x1b[0m");
}
module.exports = Raven;
