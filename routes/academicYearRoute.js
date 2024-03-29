const academicYearController = require("../controllers/academicYearController");

const router = require("express").Router();

router.get("/", academicYearController.getAcademicYears);
router.get("/:schoolId", academicYearController.getAcademicYearBySchool);
router.get("/id/:id", academicYearController.getAcademicYearById);
router.post("/", academicYearController.createAcademicYear);
router.put("/:id", academicYearController.updateAcademicYear);
router.delete("/:id", academicYearController.deleteAcademicYear);

module.exports = router;
