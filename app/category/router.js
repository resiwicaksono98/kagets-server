/** @format */

const router = require("express").Router();
const categoryController = require("./controller");

router.get("/categories", categoryController.getCategory);
router.get("/categories/:id", categoryController.categoryById);
router.post("/categories", categoryController.createCategory);
router.put("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.destroyCategory);

module.exports = router;
