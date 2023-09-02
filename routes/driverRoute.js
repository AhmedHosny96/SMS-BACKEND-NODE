const driverController = require("../controllers/driverController");

const router = require("express").Router();

router.get("/", driverController.getDrivers);
router.get("/:schoolId", driverController.getDriverBySchool);
router.get("/id/:id", driverController.getDriverById);
router.post("/", driverController.createDriver);
router.put("/:id", driverController.updateDriver);
router.delete("/:id", driverController.deleteDriver);

module.exports = router;
