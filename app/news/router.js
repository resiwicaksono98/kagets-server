/** @format */

const router = require("express").Router();
const newsController = require("./controller");
const multer = require("multer");
const path = require("path");
const config = require("../config");
const multerUpload = require("../../config/cloudinary");

router.post("/news", multerUpload.single("image"), newsController.storeNews);
router.get("/news", newsController.getNews);
router.get("/news/:id", newsController.getNewsById);
router.put("/news/:id", multerUpload.single("image"), newsController.updateNews);
router.delete("/news/:id", multerUpload.single("image"), newsController.destroyNews);

module.exports = router;
