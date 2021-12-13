const QuestionRepository = require("../repository/question_repository");
const Error = require("../model/error");

const questionRepository = new QuestionRepository();

class QuestionService {
	
    async getQuestionByID(ID) {
		try {
				const result = await questionRepository.getQuestionByID(ID);
				if (result == null) throw new Error("Not found", 404);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}
    async getQuestionByQuizID(quizID) {
		

		try {
			   const result = await questionRepository.getQuestionByQuizID(
				quizID
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
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
	async createQuestion(question) {
		try {
			const { id, content } = question;
			if (id == null || content == null) throw new Error("Bad request", 400);
			const result = await questionRepository.createQuestionByID(id, content);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}
	async updateQuestionByID(qid, question) {
		const { id, content } = question;
		if (qid == null || id == null) throw new Error("Bad request" +qid+id, 400);
		try {
			const result = await questionRepository.updateQuestionByID(
				qid,
				id,
				content
			);
			return result;
		}catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}
	async assignQuestionToQuiz(body) {
		const { questionID, quizID } = body;
		if (questionID == null || quizID == null)
			throw new Error("Bad request", 400);
		try {
			const result = await questionRepository.assignQuestionToQuiz(
				questionID,
				quizID
			);
			return result;
		} catch (err) {
			console.log(err);
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}
	async removeQuestionToQuiz(body) {
		const { questionID, quizID } = body;
		if (questionID == null || quizID == null)
			throw new Error("Bad request", 400);
		try {
			const result = await questionRepository.removeQuestionToQuiz(
				questionID,
				quizID
			);
			return result;
		} catch (err) {
			console.log(err);
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}
}

module.exports = QuestionService;
