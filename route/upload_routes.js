const router = require("express").Router();

const upload = require("../middleware/upload");
const UploadService = require("../service/upload_service");

const uploadService = new UploadService();

router.post("/", upload.single("image"), async (req, res) => {
	try {
		const image = req.file;
		const url = await uploadService.save(image);
		return res.status(200).json({ status: "OK", url: url });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const image = await uploadService.getImage(id);
		return res.status(200).contentType(image.type).send(image.data);
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

module.exports = router;
