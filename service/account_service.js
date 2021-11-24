const jwt = require("jsonwebtoken");
const AccountRepository = require("../repository/account_repository");
const Error = require("../model/error");

const accountRepository = new AccountRepository();

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
			throw new Error(err.errors[0].message, 500);
		}
	}

	async login(user) {
		const { username, password } = user;
		const result = await accountRepository.findAccount(username);

		if (result === null) throw new Error("Account not found!", 404);
		if (result.password === password)
			return generateToken(result.account_id, result.type);
		else throw new Error("Invalid credential!", 400);
	}
}

module.exports = AccountService;
