const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

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

module.exports = { Account: Account };
