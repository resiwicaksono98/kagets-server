/** @format */

const router = require("express").Router();
const problemTypeController = require("./controller");

router.get("/problem_type", problemTypeController.getProblem);
router.get("/problem_type/:id", problemTypeController.getProblemById);
router.post("/problem_type", problemTypeController.storeProblem);
router.put("/problem_type/:id", problemTypeController.updateProblemType);
router.delete("/problem_type/:id", problemTypeController.destroyProblemType);

module.exports = router;
