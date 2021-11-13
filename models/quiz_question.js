const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const { Quiz } = require("./quiz");
const { Question } = require("./question");

const QuizQuestion = sequelize.define(
	"quiz_question",
	{
		quiz_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		question_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

QuizQuestion.belongsTo(Quiz, { foreignKey: "quiz_id" });
QuizQuestion.belongsTo(Question, { foreignKey: "question_id" });
module.exports = { QuizQuestion: QuizQuestion };
