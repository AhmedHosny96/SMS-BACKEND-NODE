const assignmentController = require("../controllers/assignmentController");

const router = require("express").Router();

router.get("/", assignmentController.getAssignments);
router.get("/:id", assignmentController.getAssignmentById);
router.post("/", assignmentController.createAssigment);
router.put("/:id", assignmentController.updateAssignment);
router.delete("/:id", assignmentController.deleteAssignment);

module.exports = router;
