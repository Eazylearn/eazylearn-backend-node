const QuizRepository = require("../repository/quiz_repository");
const Error = require("../model/error");

const quizRepository = new QuizRepository();

class QuizService {
	
    async getQuizByID(ID) {
		try {
			var result;
				result = await quizRepository.getQuizByID(
					ID
				);
			
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
    async getQuizIDByCourseID(course_id) {
		try {
			var result;
				result = await quizRepository.getQuizIDByCourseID(
					course_id
				);
			
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
	async deleteQuizByID(id) {
		try {
			const result = await quizRepository.deleteQuizByID(id);
			return result;
			}
	    catch (err) {
			throw Error(err[0].message, 500);
		}
	}async createQuiz(quiz) {
		if (type !== 1) throw new Error("Unauthorized", 401);
		try {
			const { id, name, time_limit, course_id} = quiz;
			if (
                id == null ||
                name == null ||
                time_limit == null ||
                course_id == null
			)
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
			throw new Error("Bad request", 401);
		try {
			const result = await courseRepository.updateQuizByID(
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
