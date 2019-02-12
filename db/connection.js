"use strict";

const fs        = require("fs");
const path      = require("path");
const Sequelize = require("sequelize");
const basename  = path.basename(module.filename);
const db        = {};
const auth = require("./auth");

const sequelize = new Sequelize(auth.database,
	auth.username,
	auth.password,
	auth.options);

fs
	.readdirSync(__dirname+"/models")
	.filter((file) => {
		return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
	})
	.forEach((file) => {
		const model = sequelize["import"](path.join(__dirname+"/models", file));
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	sequelize.sync(db[modelName]).then(() => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});
});

sequelize
	.authenticate()
	.catch((err) => {
		console.log("Unable to connect to the database:", err);
	});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import Models such that I can use them in the api just by importing 'db'
db.Session = require("./models/session")(sequelize, Sequelize);
db.User = require("./models/user")(sequelize, Sequelize);

module.exports = db;
