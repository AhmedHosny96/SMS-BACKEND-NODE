const shiftController = require("../controllers/shiftController");

const router = require("express").Router();

router.get("/", shiftController.getShifs);
router.get("/:id", shiftController.getShiftById);
router.post("/", shiftController.createShift);
router.put("/:id", shiftController.updateShift);
router.delete("/:id", shiftController.deleteShift);

module.exports = router;
