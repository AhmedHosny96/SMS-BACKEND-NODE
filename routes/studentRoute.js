const studentController = require("../controllers/studentController");

const router = require("express").Router();

router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudnentById);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deletStudent);

module.exports = router;
