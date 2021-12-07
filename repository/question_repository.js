const Question = require("../model/question");
const QuizQuestion = require("../model/quiz_question");
class QuestionRepository {
	async getQuestionIDByQuizID(quizID) {
		try {
			const questionID = await QuizQuestion.findAll({
				where: {
					quiz_ID: quizID,
				},
			});

			const result = [];
			questionID.forEach((c) => result.push(c.questionID));
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async getQuestionByID(ID) {
		try {
			const question = await Question.findAll({
				where: {
					question_id: getQuestionIDByID(ID),
				},
			});

			const result = [];
			question.forEach((c) => result.push(c.question));
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async deleteQuestionByID(id) {
		try {
			const result = await Question.destroy({
				where: {
					question_id: id,
				},
			});
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async createQuestionByID(id, Content) {
		try {
			const result = await Question.create({
				question_id: id,
				question_content: Content,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}
	async updateQuestionByID(id, Content) {
		try {
			const result = await Course.update(
				{
					question_id: id,
					question_content: Content,
				},
				{
					where: {
						question_id: id,
					},
				}
			);
			return result;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = QuestionRepository;
