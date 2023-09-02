const leaveRequestController = require("../controllers/leaveRequestController");

const router = require("express").Router();

router.get("/", leaveRequestController.getLeaveRequests);
router.get("/:schoolId", leaveRequestController.getLeaveRequestsBySchool);
router.get("/id/:id", leaveRequestController.getLeaveRequestById);
router.post("/", leaveRequestController.createLeaveRequest);
router.put("/:id", leaveRequestController.updateLeaveRequest);
router.delete("/:id", leaveRequestController.deleteLeaveRequest);

module.exports = router;
