const Account = require("../model/account");
const studentRepository = require("../repository/student_repository");
const lecturerRepository = require("../repository/lecturer_repository");
const adminRepository = require("../repository/admin_repository");
class AccountRepository {
	async createAccount(username, password, type, name, classId) {
		try {
			await Account.create({
				account_id: username,
				password: password,
				type: type,
			});
			if (type == 0) {
				await adminRepository.createAdmin(username, name, username);
			} else if (type == 1) {
				await lecturerRepository.createLecturerByID(username, name, username);
			} else if (type == 2) {
				await studentRepository.createStudentByID(
					username,
					name,
					classId,
					username
				);
			}
		} catch (err) {
			throw err;
		}
	}

	async findAccount(username) {
		try {
			const account = Account.findOne({
				where: {
					account_id: username,
				},
			});
			return account;
		} catch (err) {
			throw err;
		}
	}

	async findAccountInfoByID(username) {
		try {
			const account = await Account.findOne({
				where: {
					account_id: username,
				},
			});
			if (account.type === 1) {
				return await lecturerRepository.getLecturerByID(username);
			} else if (account.type === 2) {
				return await studentRepository.getStudentByID(username);
			} else if (account.type === 0)
				return await adminRepository.getAdminByID(username);
			return null;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = new AccountRepository();
