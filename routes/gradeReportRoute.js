const gradeReportController = require("../controllers/gradeReportController");

const router = require("express").Router();

// router.get("/", gradeReportController.getAssets);
router.get(
  "/:schoolId/student/:studentId/semister/:semisterId",
  gradeReportController.getGradeReportOfStudent
);
// router.get("/id/:id", gradeReportController.getAssetById);
// router.post("/", gradeReportController.createAsset);
// router.put("/:id", gradeReportController.updateAsset);
// router.delete("/:id", gradeReportController.deleteAsset);

module.exports = router;
