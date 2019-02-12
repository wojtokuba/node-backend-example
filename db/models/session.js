"use strict";
module.exports = (sequelize, DataTypes) => {
	const Session = sequelize.define("Session", {
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			unique: true
		},
		user: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		activeTo: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		authKey: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	}, {});
	Session.associate = function(models) {
		Session.belongsTo(models.User, {foreignKey: "user"});
		// associations can be defined here
	};
	return Session;
};
