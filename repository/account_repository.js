const Account = require("../model/account");

class AccountRepository {
	async createAccount(username, password, type) {
		const newAccount = await Account.create({
			account_id: username,
			password: password,
			type: type,
		});
		return newAccount;
	}

	async findAccount(username) {
		const account = Account.findOne({
			where: {
				account_id: username,
			},
		});
		return account;
	}
}

module.exports = AccountRepository;
