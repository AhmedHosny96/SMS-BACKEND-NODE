const timetableController = require("../controllers/timetableController");

const router = require("express").Router();

router.get("/", timetableController.getTimeTable);
router.get("/:schoolId", timetableController.getTimeTableBySchool);
router.get("/id/:id", timetableController.getTimeTableById);
router.get(
  "/:classId/:sectionId",
  timetableController.getTimeTableByClassAndSection
);
router.post("/", timetableController.createTimetable);
router.put("/:id", timetableController.updateTimeTable);
router.delete("/:id", timetableController.deleteTimeTable);

module.exports = router;
