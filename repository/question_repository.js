const Question = require("../model/question");
class QuestionRepository{
    async createQuestion(id, Content){
        const newQuestion = await Question.create({
			question_id: id,
			question_content: Content,
		});
		return newQuestion;
    }
    async getQuestionByID(QuestionID){
        try {
			const question = await Question.findOne({
				where: {
					question_id: QuestionID,
				},
			});
			return question;
		} catch(err) {
			throw err;
		}
    }
	async updateQuestionByID(qid, id, content){
		try {
			const result = await Question.update(
				{
					question_id: id,
					question_content: content
				},
				{
					where: {
						course_id: qid,
					},
				}
			);
			return result;
		} catch (err) {
			throw err;
		}
	}
	async deleteQuestionByID(id) {
		try {
			return await Question.destroy({
				where: {
					question_id: id,
				},
			});
		} catch (err) {
		throw err;
		}	
	}
}

module.exports = QuestionRepository;
