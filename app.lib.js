const express = require("express");
const app = express();
const routers = require("./src/index");
const db = require("./db/connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const shouldDocBeAccessible = require("./lib/shouldDocBeAccessible");
const docAuth = require("./basicAuth");
const assert = require("assert");

function initializeStatements() {
	console.log("Initializing statements");
	app.use(logger("dev"));
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(bodyParser.json());
}
function startListening() {
	app.listen(process.env.LISTEN_PORT || 3001, () => {
		console.log(`App is listening on port: ${process.env.LISTEN_PORT || 3001}`);
		console.log(`App is accessible at http://localhost:${process.env.LISTEN_PORT || 3001}`);
	});
}
function setAppIndex() {
	console.log("Setting app index page");
	app.get(`${process.env.APP_PATH}`, (req, res, next) => {
		res.end("Core status OK");
	});
}

function registerAppDocs() {
	if (shouldDocBeAccessible()) {
		console.log(`Registering ${process.env.APP_PATH}/docs static directory with app documentation`);
		app.use(`${process.env.APP_PATH}/docs`, docAuth, express.static(path.join(__dirname, "/doc")));
	} else {
		console.log("Omitting registering documentation directory. Not DEV environment.");
	}

}

function prepareRouters() {
	routers.forEach(router => {
		console.log(`Preparing routes for: ${process.env.APP_PATH}/v1${router.path}`);
		app.use(`${process.env.APP_PATH}/v1${router.path}`, router);
	});
}

function allowCORS(){
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		res.header("Access-Control-Expose-Headers", "Authorization");
		res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		next();
	});
}
function init() {
	allowCORS();
	initializeStatements();
	setAppIndex();
	prepareRouters();
	registerAppDocs();
	startListening();
}

init();
module.exports = app;
