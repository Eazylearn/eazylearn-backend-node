const jwt = require("jsonwebtoken");
const Account = require("../model/account");
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
			const createdUser = await Account.create({
				account_id: username,
				password: password,
				type: type,
			});
			return generateToken(createdUser.account_id, createdUser.type);
		} catch (err) {
			throw new Error(err.errors[0].message, 500);
		}
	}

	async login(user) {
		const { username, password } = user;
		const result = await Account.findOne({
			where: {
				account_id: username,
			},
		});
		if (result === null) throw new Error("Account not found!", 400);
		if (result.password === password)
			return generateToken(result.account_id, result.type);
		else throw new Error("Invalid credential!", 400);
	}
}

module.exports = AccountService;
