const Account = require("../model/account");
const Student = require("../model/student");
const Lecturer = require("../model/lecturer");
class AccountRepository {
	async createAccount(username, password, type) {
		try {
			const newAccount = await Account.create({
				account_id: username,
				password: password,
				type: type,
			});
			return newAccount;
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
				const result = await Lecturer.findOne({
					where: {
						account_id: username,
					},
				});
				return result;
			} else if (account.type === 2) {
				const result = await Student.findOne({
					where: {
						account_id: username,
					},
				});
				return result;
			}
			return null;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = AccountRepository;
