const sectionController = require("../controllers/sectionController");

const router = require("express").Router();

router.get("/", sectionController.getSections);
router.get("/:schoolId", sectionController.getSectionBySchool);
router.get("/id/:id", sectionController.getSectionById);
router.get("/:schoolId/:classId", sectionController.getSectionBySchoolAndClass);
router.get("/class/:classId", sectionController.getSectionByClassId);
router.post("/", sectionController.createSection);
router.put("/:id", sectionController.updateSection);
router.delete("/:id", sectionController.deleteSection);

module.exports = router;
