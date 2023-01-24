/** @format */

const router = require("express").Router();
const newsController = require("./controller");
const multer = require("multer");
const path = require("path");
const config = require("../config");
const multerUpload = require("../../config/cloudinary");

// const diskStorage = multer.diskStorage({
//    destination: function (req, file, cb) {
//       cb(null, path.resolve(config.rootPath, "public/images/news"));
//    },
//    filename: function (req, file, cb) {
//       cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
//    },
// });

router.post("/news", multerUpload.single("image"), newsController.storeNews);
router.get("/news", newsController.getNews);
router.get("/news/:id", newsController.getNewsById);
// router.put("/news/:id", multer({ storage: diskStorage }).single("image"), newsController.updateNews);
router.delete("/news/:id", newsController.destroyNews);

module.exports = router;
