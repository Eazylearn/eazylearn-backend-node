const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Account = sequelize.define(
	"account",
	{
		account_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		password: {
			type: DataTypes.STRING,
		},
		type: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = Account;
