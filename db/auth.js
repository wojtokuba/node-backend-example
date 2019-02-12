const assert = require("assert");
const Sequelize = require("sequelize");
const environment = process.env.APP_ENV || "dev";
const config = require("./config/config");

const Op = Sequelize.Op;
const operatorsAliases = {
	$eq: Op.eq,
	$ne: Op.ne,
	$gte: Op.gte,
	$gt: Op.gt,
	$lte: Op.lte,
	$lt: Op.lt,
	$not: Op.not,
	$in: Op.in,
	$notIn: Op.notIn,
	$is: Op.is,
	$like: Op.like,
	$notLike: Op.notLike,
	$iLike: Op.iLike,
	$notILike: Op.notILike,
	$regexp: Op.regexp,
	$notRegexp: Op.notRegexp,
	$iRegexp: Op.iRegexp,
	$notIRegexp: Op.notIRegexp,
	$between: Op.between,
	$notBetween: Op.notBetween,
	$overlap: Op.overlap,
	$contains: Op.contains,
	$contained: Op.contained,
	$adjacent: Op.adjacent,
	$strictLeft: Op.strictLeft,
	$strictRight: Op.strictRight,
	$noExtendRight: Op.noExtendRight,
	$noExtendLeft: Op.noExtendLeft,
	$and: Op.and,
	$or: Op.or,
	$any: Op.any,
	$all: Op.all,
	$values: Op.values,
	$col: Op.col
};
let auth = {
	database: config[environment].database,
	username: config[environment].username,
	password: config[environment].password,
	options: {
		host: config[environment].host,
		encrypt: true,
		dialect: "mysql",
		operatorsAliases,
		logging: false
	}
};

module.exports = auth;
