const Quiz = require("../model/quiz");
const QuizQuestion = require("../model/quiz_question");

class QuizRepository {
	async getQuizByCourseID(courseID) {
		try {
			const quizID = await Quiz.findAll({
				where: {
					course_id: courseID,
				},
				include: {
					model: Quiz,
				},
			});

			const result = [];
			quizID.forEach((c) => result.push(c.quiz));
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async getQuizByID(ID) {
		try {
			const quiz = await Quiz.findOne({
				where: {
					quiz_id: ID,
				},
			});
			return quiz;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async deleteQuizByID(id) {
		try {
			const result = await Quiz.destroy({
				where: {
					quiz_id: id,
				},
			});
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async createQuiz(id, name, timeLỉmit, courseID) {
		try {
			const result = await Quiz.create({
				quiz_id: id,
				quiz_name: name,
				time_lỉmit: timeLỉmit,
				course_id: courseID,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}
	async updateQuizByID(id, name, timeLimit, courseID) {
		try {
			const result = await Course.update(
				{
					quiz_id: id,
					quiz_name: name,
					time_limit: timeLimit,
					course_id: courseID,
				},
				{
					where: {
						quiz_id: id,
					},
				}
			);
			return result;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = new QuizRepository();
