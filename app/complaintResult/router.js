/** @format */

const { updateComplaintResult, getAll, getOne } = require("./controller");

const router = require("express").Router();

router.put("/complaint_result/:id", updateComplaintResult);
router.get("/complaint_result", getAll);
router.get("/complaint_result/:id", getOne);

module.exports = router;
