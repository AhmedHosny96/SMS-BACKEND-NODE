const markSheet = require("../controllers/markSheetController");

const router = require("express").Router();

router.get("/", markSheet.getMarks);
router.get("/:schoolId", markSheet.getMarksBySchool);
router.get("/id/:id", markSheet.getMarksById);
router.post("/", markSheet.createMarks);
router.put("/:id", markSheet.updateMarks);
router.delete("/:id", markSheet.deleteMarks);

module.exports = router;
