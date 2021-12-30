const Admin = require("../model/admin");

class AdminRepository {
	async getAdminByID(ID) {
		try {
			const admin = Admin.findOne({
				where: {
					admin_id: ID,
				},
			});
			return admin;
		} catch (err) {
			throw err;
		}
	}
	async createAdmin(id, name, account_id) {
		try {
			const result = Admin.create({
				admin_id: id,
				admin_name: name,
				account_id: account_id,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = new AdminRepository();
