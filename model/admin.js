const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");
const Account = require("./account");

const Admin = sequelize.define(
	"admin",
	{
		admin_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		admin_name: {
			type: DataTypes.STRING,
		},
		account_id: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);
Admin.belongsTo(Account, { foreignKey: "account_id" });
module.exports = Admin;
