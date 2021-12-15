const quizRepository = require("../repository/quiz_repository");
const Error = require("../model/error");

class QuizService {
	async getQuizByID(ID) {
		var result;
		try {
			result = await quizRepository.getQuizByID(ID);

			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
	async getQuizByCourseID(course_id) {
		var result;
		try {
			result = await quizRepository.getQuizByCourseID(course_id);

			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
	async deleteQuizByID(id) {
		try {
			const result = await quizRepository.deleteQuizByID(id);
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
	async createQuiz(quiz) {
		try {
			const { id, name, time_limit, course_id } = quiz;
			if (id == null || name == null || time_limit == null || course_id == null)
				throw new Error("Bad request", 400);
			const result = await quizRepository.createQuiz(
				id,
				name,
				time_limit,
				course_id
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}
	async updateQuizByID(qid, quiz) {
		const { id, name, time_limit, course_id } = quiz;
		if (
			qid == null ||
			id == null ||
			name == null ||
			time_limit == null ||
			course_id == null
		)
			throw new Error("Bad request", 400);
		try {
			const result = await quizRepository.updateQuizByID(
				qid,
				id,
				name,
				time_limit,
				course_id
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}
}

module.exports = QuizService;
