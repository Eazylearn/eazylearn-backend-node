const Course = require("../model/course");
const StudentCourse = require("../model/student_course");
const LecturerCourse = require("../model/lecturer_course");
const studentRepository = require("./student_repository");
const lecturerRepository = require("./lecturer_repository");
const { Op } = require("sequelize");
class CourseRepository {
	async createCourse(id, name, academicYear, semester) {
		try {
			const result = await Course.create({
				course_id: id,
				course_name: name,
				academic_year: academicYear,
				semester: semester,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}

	async assignStudentToCourse(studentID, courseID) {
		try {
			const result = await StudentCourse.create({
				course_id: courseID,
				student_id: studentID,
				status: 1,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}

	async assignLecturerToCourse(lecturerID, courseID) {
		try {
			const result = await LecturerCourse.create({
				course_id: courseID,
				lecturer_id: lecturerID,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}

	async getCourseByID(courseID) {
		try {
			const c = await Course.findOne({
				where: {
					course_id: courseID,
				},
			});
			if (c != null) {
				const students = await studentRepository.getStudentByCourseID(courseID);
				const lecturers = await lecturerRepository.getLecturerByCourseID(
					courseID
				);
				c.dataValues.students = students;
				c.dataValues.lecturers = lecturers;
			}
			return c;
		} catch (err) {
			throw err;
		}
	}

	async getCourseByStudentID(studentID, semester) {
		try {
			const courses = await StudentCourse.findAll({
				where: {
					student_id: studentID,
				},
				include: {
					model: Course,
					where: semester == null ? null : { semester: semester },
				},
			});

			const result = [];
			courses.forEach((c) => result.push(c.course));
			return result;
		} catch (err) {
			throw err;
		}
	}

	async getCourseByLecturerID(lecturerID) {
		try {
			const courses = await LecturerCourse.findAll({
				where: {
					lecturer_id: lecturerID,
				},
				include: Course,
			});

			const result = [];
			for (var c of courses) {
				c = c.course;
				const lec = await lecturerRepository.getLecturerByCourseID(c.course_id);
				const stu = await studentRepository.getStudentByCourseID(c.course_id);
				const data = {
					course_id: c.course_id,
					course_name: c.course_name,
					academic_year: c.academic_year,
					semester: c.semester,

					lecturers: lec,
					students: stu,
				};
				result.push(data);
			}
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async updateCourseByID(qid, id, name, academicYear, semester) {
		try {
			if (id)
				await Course.update(
					{
						course_id: id,
					},
					{
						where: {
							course_id: qid,
						},
					}
				);
			if (name)
				await Course.update(
					{
						course_name: name,
					},
					{
						where: {
							course_id: qid,
						},
					}
				);
			if (academicYear)
				await Course.update(
					{
						academic_year: academicYear,
					},
					{
						where: {
							course_id: qid,
						},
					}
				);
			if (semester)
				await Course.update(
					{
						semester: semester,
					},
					{
						where: {
							course_id: qid,
						},
					}
				);
			return await this.getCourseByID(qid);
		} catch (err) {
			throw err;
		}
	}

	async deleteCourseByID(id) {
		try {
			return await Course.destroy({
				where: {
					course_id: id,
				},
			});
		} catch (err) {
			throw err;
		}
	}

	async removeStudentFromCourse(studentID, courseID) {
		try {
			return await StudentCourse.destroy({
				where: {
					course_id: courseID,
					student_id: studentID,
				},
			});
		} catch (err) {
			throw err;
		}
	}

	async removeLecturerFromCourse(lecturerID, courseID) {
		try {
			return await LecturerCourse.destroy({
				where: {
					course_id: courseID,
					lecturer_id: lecturerID,
				},
			});
		} catch (err) {
			throw err;
		}
	}
	async getCourseByAdmin(page, sem) {
		try {
			const course = await Course.findAll({
				where: sem == null ? null : { semester: sem },
			});

			const result = [];
			var data;
			var i = 0;
			const course_per_page = 2;
			for (var c of course) {
				if (i >= page * course_per_page && i < (page + 1) * course_per_page) {
					const lec = await lecturerRepository.getLecturerByCourseID(
						c.course_id
					);
					const stu = await studentRepository.getStudentByCourseID(c.course_id);
					data = {
						course_id: c.course_id,
						course_name: c.course_name,
						academic_year: c.academic_year,
						semester: c.semester,

						lecturers: lec,
						students: stu,
					};
					result.push(data);
				}
				i++;
			}
			const maxPage = Math.ceil(i / course_per_page);
			//result.push({maxPage})
			//course.forEach((c)=>result.push(c))
			// test.forEach((c)=>result.push(c))

			return { courses: result, maxPage: maxPage };
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async search(query) {
		try {
			const result = await Course.findAll({
				where: {
					[Op.or]: [
						{
							course_id: {
								[Op.iLike]: "%" + query + "%",
							},
						},
						{
							course_name: {
								[Op.iLike]: "%" + query + "%",
							},
						},
					],
				},
			});
			return result;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = new CourseRepository();
