const jwt = require("jsonwebtoken");
const accountRepository = require("../repository/account_repository");
const Error = require("../model/error");

function generateToken(account_id, type) {
	return jwt.sign(
		{ account_id: account_id, type: type },
		process.env.TOKEN_KEY
	);
}

class AccountService {
	async signUp(user) {
		const { username, password, type } = user;
		if (!username || !password || type === null || type < 0 || type > 2)
			throw new Error("Bad request", 400);
		try {
			const createdUser = await accountRepository.createAccount(
				username,
				password,
				type
			);
			return generateToken(createdUser.account_id, createdUser.type);
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}

	async login(user) {
		const { username, password } = user;
		try {
			const result = await accountRepository.findAccount(username);

			if (result == null) throw new Error("Account not found!", 404);
			if (result.password === password)
				return generateToken(result.account_id, result.type);
			else throw new Error("Invalid credential!", 400);
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}

	async getAccountByID(username) {
		if (username == null) throw new Error("Bad request", 400);
		try {
			const result = await accountRepository.findAccountInfoByID(username);
			if (result == null) throw new Error("Account not found!", 404);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}
}

module.exports = AccountService;
