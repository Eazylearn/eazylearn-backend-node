const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");
const Question = require("./question");

const Option = sequelize.define(
	"option",
	{
		question_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		content: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		is_answer: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

Option.belongsTo(Question, { foreignKey: "question_id" });
module.exports = Option;
