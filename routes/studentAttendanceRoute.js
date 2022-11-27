const studentAttendanceController = require("../controllers/studentAttendanceController");

const router = require("express").Router();

router.get("/", studentAttendanceController.getStudentAttendance);
router.get("/:id", studentAttendanceController.getStudentAttendanceById);
router.post("/", studentAttendanceController.createStudentAttendance);
router.put("/:id", studentAttendanceController.updateStudentAttendance);
router.delete("/:id", studentAttendanceController.deleteStudentAttendance);

module.exports = router;
