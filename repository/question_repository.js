const Question = require("../model/question");
const QuizQuestion = require("../model/quiz_question");
class QuestionRepository {
	async getQuestionByQuizID(quizID) {
		try {
			const questionID = await QuizQuestion.findAll({
				where: {
					quiz_id: quizID,
				},
				include: {
					model: Question,
				},
			});
			const result = [];
			questionID.forEach((c) => result.push(c.question));
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async getQuestionByID(id) {
		try {
			const question = await Question.findOne({
				where: {
					question_id: id,
				},
			});

			return question;
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
	async updateQuestionByID(qid, id, Content) {
		try {
			const result = await Question.update(
				{
					question_id: id,
					question_content: Content,
				},
				{
					where: {
						question_id: qid,
					},
				}
			);
			return result;
		} catch (err) {
			throw err;
		}
	}
	async assignQuestionToQuiz(questionID, quizID) {
		try {
			const result = await QuizQuestion.create({
				question_id: questionID,
				quiz_id: quizID,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}
	async removeQuestionToQuiz(questionID, quizID) {
		try {
			return await QuizQuestion.destroy({
				where: {
					question_id: questionID,
					quiz_id: quizID,
				},
			});
		} catch (err) {
			throw err;
		}
	}
}

module.exports = new QuestionRepository();
