const assesmentController = require("../controllers/assesmentController");

const router = require("express").Router();

router.get("/", assesmentController.getAssesments);
router.get("/:schoolId", assesmentController.getAssessmentBySchool);
router.get(
  "/:schoolId/class/:classId/section/:sectionId",
  assesmentController.getAssessmentByClassAndSection
);

router.get(
  "/:schoolId/class/:classId/section/:sectionId/subject/:subjectId",
  assesmentController.getAssesmentByClaSecAndSub
);
router.get(
  "/:schoolId/section/:sectionId",
  assesmentController.getAssesmentBySection
);
router.get("/:id", assesmentController.getAssessmentById);
router.post("/", assesmentController.createAssesment);
router.put("/:schoolId/update/:id", assesmentController.updateAssessment);
router.delete("/:id", assesmentController.deleteAssessment);

module.exports = router;
