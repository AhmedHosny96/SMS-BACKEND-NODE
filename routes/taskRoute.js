const taskController = require("../controllers/taskController");

const router = require("express").Router();

router.get("/", taskController.getTasks);
router.get("/:schoolId", taskController.getTaskBySchool);
router.get("/id/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
