const eventController = require("../controllers/eventController");

const router = require("express").Router();

router.get("/", eventController.getEvents);
router.get("/:schoolId", eventController.getEventBySchool);
router.get("/id/:id", eventController.getEventById);
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEventById);

module.exports = router;
