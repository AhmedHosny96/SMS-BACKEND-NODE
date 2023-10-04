const studentController = require("../controllers/studentController");

const router = require("express").Router();

router.get("/", studentController.getStudents);
router.get("/:schoolId", studentController.getStudentBySchool);
router.get("/id/:id", studentController.getStudentById);
router.get(
  "/section/:sectionId/:schoolId",
  studentController.getStudentBySection
);
router.get(
  "/destination/:destinationId",
  studentController.getStudentByDestinationId
);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
