const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");
const Lecturer = require("./lecturer");
const Course = require("./course");
const LecturerCourse = sequelize.define(
	"lecturer_course",
	{
		lecturer_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		course_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

LecturerCourse.belongsTo(Lecturer, { foreignKey: "lecturer_id" });
LecturerCourse.belongsTo(Course, { foreignKey: "course_id" });
module.exports = LecturerCourse;
