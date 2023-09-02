const studentFeeController = require("../controllers/studentFeeController");

const router = require("express").Router();

router.get("/", studentFeeController.getStudentFees);
router.get("/:schoolId", studentFeeController.getStudentFeesBySchool);
router.get("/id/:id", studentFeeController.getStudentFeeById);
router.post("/", studentFeeController.createStudentFee);
router.put("/:id", studentFeeController.updateStudentFee);
router.delete("/:id", studentFeeController.deleteStudentFeeById);

module.exports = router;
