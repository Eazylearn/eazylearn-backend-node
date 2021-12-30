const Lecturer = require("../model/lecturer");
const LecturerCourse = require("../model/lecturer_course");
class LecturerRepository {
	async getAllLecturers() {
		try {
			return await Lecturer.findAll();
		} catch (err) {
			throw err;
		}
	}
	async getLecturerByCourseID(courseID) {
		try {
			const lecturerID = await LecturerCourse.findAll({
				where: {
					course_id: courseID,
				},
				include: {
					model: Lecturer,
				},
			});

			const result = [];
			lecturerID.forEach((c) => result.push(c.lecturer));
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async getLecturerByID(ID) {
		try {
			const lecturer = await Lecturer.findOne({
				where: {
					lecturer_id: ID,
				},
			});
			return lecturer;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async deleteLecturerByID(id) {
		try {
			const result = await Lecturer.destroy({
				where: {
					lecturer_id: id,
				},
			});
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async createLecturerByID(id, name, accountID) {
		try {
			const result = await Lecturer.create({
				lecturer_id: id,
				lecturern_name: name,
				account_id: accountID,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}
	async updateLecturerByID(qid, id, name, accountID) {
		try {
			const result = await Course.update(
				{
					lecturer_id: id,
					lecturern_name: name,
					account_id: accountID,
				},
				{
					where: {
						lecturer_id: qid,
					},
				}
			);
			return result;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = new LecturerRepository();
