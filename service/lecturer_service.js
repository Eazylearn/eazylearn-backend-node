const QuestionRepository = require("../repository/lecturer_repository");
const Error = require("../model/error");
const LecturerRepository = require("../repository/lecturer_repository");
const lecturerRepository = new LecturerRepository();

class LecturerService {
	
    async getLecturerByID(ID) {
        var result;
		try {
			
				result = await lecturerRepository.getLecturerByID(
					ID
				);
			
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
    async getLecturerByCourseID(quiz_id) {
        var result;
		try {
			
				result = await lecturerRepository.getLecturerByCourseID(
					course_id
				);
			
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
	async deleteLecturerByID(id) {
		try {
			const result = await lecturerRepository.deleteLecturerByID(id);
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
	async createLecturer(lecturer) {
		if (type !== 1) throw new Error("Unauthorized", 401);
		try {
			const { id, name, account_id } = lecturer;
			if (id == null || name == null || account_id == null)
				throw new Error("Bad request", 400);
			const result = await lecturerRepository.createLecturer(
				id,
				name,
				account_id
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}
	async updateLecturerByID(qid, lecturer) {
		const { id, name, account_id } = lecturer;
		if (qid == null || id == null) throw new Error("Bad request", 400);
		try {
			const result = await courseRepository.updateLecturerByID(
				qid,
				id,
				name,
				account_id
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}
}

module.exports = LecturerService;
