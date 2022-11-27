const academicYearController = require("../controllers/academicYearController");

const router = require("express").Router();

router.get("/", academicYearController.getAcademicYears);
router.get("/:id", academicYearController.getAcademicYearById);
router.post("/", academicYearController.createAcademicYear);
router.put("/:id", academicYearController.updateAcademicYear);
router.delete("/:id", academicYearController.deleteAcademicYear);

module.exports = router;
