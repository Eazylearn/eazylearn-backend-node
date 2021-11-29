const QuestionRepository = require("../repository/question_repository");
const Error = require("../model/error");

const questionRepository = new QuestionRepository();

class QuestionService {
	
    async getQuestionByID(ID) {
		try {
			var result;
				result = await questionRepository.getQuestionID(
					ID
				);
			
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
    async getQuestionIDByQuizID(quiz_id) {
		try {
			var result;
				result = await questionRepository.getQuestionByQuizID(
					quiz_id
				);
			
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
	async deleteQuestionByID(id) {
		try {
			const result = await questionRepository.deleteQuestionByID(id);
			return result;
			}
	    catch (err) {
			throw Error(err[0].message, 500);
		}
	}async createQuestion(question) {
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
	async updateQuestionByID(qid, question) {
		const { id, content } = question;
		if (
			qid == null ||
			id == null 
			)
			throw new Error("Bad request", 401);
		try {
			const result = await courseRepository.updateQuestionByID(
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
}

module.exports = QuestionService;
