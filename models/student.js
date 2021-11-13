const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const { Account } = require("./account");

const Student = sequelize.define(
	"student",
	{
		student_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		student_name: {
			type: DataTypes.STRING,
		},
		class_id: {
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

Student.belongsTo(Account, { foreignKey: "account_id" });
module.exports = { Student: Student };
