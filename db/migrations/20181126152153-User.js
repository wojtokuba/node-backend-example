"use strict";

module.exports = {
	"up": ( queryInterface, Sequelize ) => {
		return queryInterface.createTable( "users", {
			"id": {
				"primaryKey": true,
				"type": Sequelize.UUID,
				unique: true
			},
			"name": Sequelize.STRING,
			"lastName": Sequelize.STRING,
			"email": {
				type: Sequelize.STRING,
				unique: true
			},
			"password": Sequelize.STRING,
			"marketingAgree": Sequelize.BOOLEAN,
			activateKey: {
				allowNull: true,
				type: Sequelize.STRING
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			"createdAt": {
				"defaultValue": Sequelize.NOW,
				"type": Sequelize.DATE
			},
			"deletedAt": {
				"defaultValue": null,
				"allowNull": true,
				"type": Sequelize.DATE
			},
			updatedAt: {
				defaultValue: null,
				allowNull: true,
				type: Sequelize.DATE
			}
		} );
	},
	"down": ( queryInterface, Sequelize ) => {
		return queryInterface.dropTable("users");
	}
};
