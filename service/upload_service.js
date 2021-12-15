const Error = require("../model/error");
const imageRepository = require("../repository/upload_repository");

class UploadService {
	async save(image) {
		if (!image) throw new Error("Bad request", 400);
		try {
			const uploadedImage = await imageRepository.save(image);
			return "/image/" + uploadedImage.image_id;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}

	async getImage(id) {
		try {
			const image = await imageRepository.getImage(id);
			if (image == null) throw new Error("Not found", 404);
			return image;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}
}

module.exports = UploadService;
