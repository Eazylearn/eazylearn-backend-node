const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const { Account } = require("./account");

const Lecturer = sequelize.define(
	"lecturer",
	{
		lecturer_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		lecturer_name: {
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
Lecturer.belongsTo(Account, { foreignKey: "account_id" });
module.exports = { Lecturer: Lecturer };
