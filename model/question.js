const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Question = sequelize.define(
	"question",
	{
		question_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		question_content: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = Question;
