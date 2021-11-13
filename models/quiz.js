const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const { Course } = require("./course");

const Quiz = sequelize.define(
	"quiz",
	{
		quiz_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		quiz_name: {
			type: DataTypes.STRING,
		},
		time_limit: {
			type: DataTypes.INTEGER,
		},
		course_id: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

Quiz.belongsTo(Course, { foreignKey: "course_id" });
module.exports = { Quiz: Quiz };
