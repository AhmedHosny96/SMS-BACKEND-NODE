const leaveTypeController = require("../controllers/leaveTypeController");

const router = require("express").Router();

router.get("/", leaveTypeController.getLeaveTypes);
router.get("/:id", leaveTypeController.getLeaveTypeById);
router.post("/", leaveTypeController.createLeaveType);
router.put("/:id", leaveTypeController.updateLeaveType);
router.delete("/:id", leaveTypeController.deleteLeaveType);

module.exports = router;
