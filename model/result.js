const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");
const Student = require("./student");
const Quiz = require("./quiz");

const Result = sequelize.define(
	"result",
	{
		result_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		student_id: {
			type: DataTypes.STRING,
		},
		quiz_id: {
			type: DataTypes.STRING,
		},
		time_taken: {
			type: DataTypes.INTEGER,
		},
		score: {
			type: DataTypes.FLOAT,
		},
		student_answer: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

Result.belongsTo(Student, { foreignKey: "student_id" });
Result.belongsTo(Quiz, { foreignKey: "quiz_id" });
module.exports = Result;
