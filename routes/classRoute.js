const classController = require("../controllers/classController");

const router = require("express").Router();

router.get("/", classController.getClasses);
router.get("/:schoolId", classController.getClassesBySchool);
router.get("/id/:id", classController.getClassById);
router.post("/", classController.createClass);
router.put("/:id", classController.updateClass);
router.delete("/:id", classController.deleteClass);

module.exports = router;
