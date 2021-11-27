const QuestionRepository = require("../repository/question_repository");
const Error = require("../model/error");

const questionRepository = new QuestionRepository();

class QuestionService {
    /* (sample :v)
	async getCourseBySemseter(sem, user) {
		try {
			var result;
			if (user.type === 2)
				result = await courseRepository.getCourseByStudentID(
					user.account_id,
					sem
				);
			else if (user.type === 1)
				result = await courseRepository.getCourseByLecturerID(user.account_id);
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
    */
	async createQuestion(question) {
		if (type !== 1) throw new Error("Unauthorized", 401);
		try {
			const { id, content} = question;
			if (
				id == null ||
				content == null
			)
				throw new Error("Bad request", 400);
			const result = await questionRepository.createQuestion(
				id,
				content
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}
    async updateQuestionByID(qid, question){
		const { id, content } = question;
		
		if (
			id == null || qid==null
		)
			throw new Error("Bad request", 401);
		try {
			const result = await questionRepository.updateQuestionByID(
				qid,
				id,
				content
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}
	async getQuestionByID(id) {
		try {
			const result = await questionRepository.getQuestionByID(id);
			if (result == null) throw new Error("Not found", 404);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}
	async deleteQuestionByID(id) {
		try {
			const result = await questionRepository.deleteQuestionByID(id);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw Error(err[0].message, 500);
		}
	}
}

module.exports = QuestionService;