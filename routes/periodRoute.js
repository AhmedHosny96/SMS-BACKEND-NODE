const periodController = require("../controllers/periodController");

const router = require("express").Router();

router.get("/", periodController.getPeriods);
router.get("/:id", periodController.getPeriodById);
router.post("/", periodController.createPeriod);
router.put("/:id", periodController.updatePeriod);
router.delete("/:id", periodController.deletePeriod);

module.exports = router;
