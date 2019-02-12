"use strict";

module.exports = {
	"up": ( queryInterface, Sequelize ) => {
		return queryInterface.createTable( "sessions", {
			"id": {
				"primaryKey": true,
				"type": Sequelize.UUID,
				unique: true
			},
			user: {
				type: Sequelize.UUID,
				references: {
					model: "Users",
					key: "id"
				},
				allowNull: false,
			},
			activeTo: {
				type: Sequelize.DATE,
				allowNull: false
			},
			authKey: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			createdAt: {
				defaultValue: Sequelize.NOW,
				type: Sequelize.DATE
			},
			updatedAt: {
				defaultValue: null,
				allowNull: true,
				type: Sequelize.DATE
			}
		} );
	},
	"down": ( queryInterface, Sequelize ) => {
		return queryInterface.dropTable( "sessions" );
	}
};
