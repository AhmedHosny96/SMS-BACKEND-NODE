const router = require("express").Router();
const schoolController = require("../controllers/schoolController");
const upload = require("../utils/multerConfig");

router.get("/", schoolController.getSchools);
router.get("/:id", schoolController.getSchoolById);
// router.post("/", upload.single("logo"), schoolController.createSchool);
router.post("/", schoolController.createSchool);
router.put("/:id", schoolController.updateSchool);
router.delete("/:id", schoolController.deleteSchool);

module.exports = router;
