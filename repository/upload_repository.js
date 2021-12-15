const { v1: uuidv1 } = require("uuid");
const Image = require("../model/image");

class UploadRepository {
	async save(image) {
		try {
			const result = await Image.create({
				image_id: uuidv1(),
				image_name: image.originalname,
				type: image.mimetype,
				data: image.buffer,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}

	async getImage(id) {
		try {
			const result = await Image.findOne({
				where: {
					image_id: id,
				},
			});
			return result;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = new UploadRepository();
