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
	async createAccount(body) {
		if (!body.body || body.body.constructor !== Array)
			throw new Error("Bad request", 400);
		const successful = [];
		const duplicates = [];
		const badRequests = [];
		for (const user of body.body) {
			const { username, password, type, name, classId } = user;
			if (
				!username ||
				!password ||
				type === null ||
				(type == 2 && !classId) ||
				!name ||
				type < 0 ||
				type > 2
			)
				badRequests.push(username);
			else {
				try {
					if ((await accountRepository.findAccount(username)) === null) {
						await accountRepository.createAccount(
							username,
							password,
							type,
							name,
							classId
						);
						successful.push(username);
					} else duplicates.push(username);
				} catch (err) {
					if (err.statusCode == null) throw new Error(err, 500);
					throw err;
				}
			}
		}
		if (badRequests.length > 0)
			throw new Error(
				{
					message: "Bad request",
					successful: successful,
					badRequests: badRequests,
					duplicates: duplicates,
				},
				400
			);
		return { successful: successful, duplicates: duplicates };
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
