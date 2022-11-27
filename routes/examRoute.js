const examController = require("../controllers/examController");

const router = require("express").Router();

router.get("/", examController.getExams);
router.get("/:id", examController.getExamById);
router.post("/", examController.createExam);
router.put("/:id", examController.updateExam);
router.delete("/:id", examController.deleteExam);

module.exports = router;
