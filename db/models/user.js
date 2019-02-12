"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			unique: true
		},
		name: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		password: DataTypes.STRING,
		marketingAgree: DataTypes.BOOLEAN,
		activateKey: {
			allowNull: true,
			type: DataTypes.STRING
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		deletedAt: {
			defaultValue: null,
			allowNull: true,
			type: DataTypes.DATE
		},
		updatedAt: {
			defaultValue: null,
			allowNull: true,
			type: DataTypes.DATE
		}
	}, {});
	User.associate = function(models) {
		User.hasMany(models.Session, { as: "sessions", foreignKey: "id"});
		// associations can be defined here
	};
	return User;
};
