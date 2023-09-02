const classRoomController = require("../controllers/classRoomController");

const router = require("express").Router();

router.get("/", classRoomController.getClassRooms);
router.get("/:schoolId", classRoomController.getClassRoomsBySchool);
router.get("/id/:id", classRoomController.getClassRoomId);
router.post("/", classRoomController.createClassRoom);
router.put("/:id", classRoomController.updateClassRoom);
router.delete("/:id", classRoomController.deleteClassRoom);

module.exports = router;
